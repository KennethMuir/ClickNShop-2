import "express-async-errors"
import express from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import mongoSanitize from "express-mongo-sanitize"
import xss from "xss-clean"
import hpp from "hpp"
import compression from "compression"
import dotenv from "dotenv"
import { PrismaClient, MerchantStatus, OfferStatus, OfferFeatured } from "@prisma/client"

import { authenticated, authorized } from "./modules/auth/middleware/authenticated"
import trackedRedirect from "./modules/affiliate/routes/tracked-redirect"
import advertiserRoutes from "./modules/advertiser/routes/advertiser.routes"

import { errorHandler } from "./middleware/error-handler"

dotenv.config()

const prisma = new PrismaClient()

const app = express()

// ============================================
// Middleware
// ============================================

// Security headers
app.use(helmet())

// CORS - restrict to known origins
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || []
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

// Rate limiting
const globalLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  message: "Too many requests from this IP, please try again later.",
})
app.use(globalLimit)

// Body parsing
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))

// Data sanitization
app.use(mongoSanitize())
app.use(xss())
app.use(hpp()) // Prevent HTTP parameter pollution
app.use(compression())

// ============================================
// Routes
// ============================================

// Affiliate tracking redirect (public endpoint)
app.use("/api/v1/go", trackedRedirect)

// Affiliate links API (supports network filtering)
app.get("/api/v1/affiliate-links", async (req, res) => {
  const { network, status, take } = req.query

  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !Object.values(MerchantStatus).includes(status as MerchantStatus))
  ) {
    return res.status(400).json({ error: "Invalid affiliate link status" })
  }

  const where = {
    ...(typeof network === "string" && {
      program: { network: { slug: network } },
    }),
    ...(typeof status === "string" && {
      status: status as MerchantStatus,
    }),
  }

  const requestedTake =
    typeof take === "string" && /^\d+$/.test(take) ? Number(take) : 20
  const takeNum = Math.min(Math.max(requestedTake, 1), 100)

  const affiliateLinks = await prisma.affiliateLink.findMany({
    where,
    include: { merchant: true, program: { include: { network: true } } },
    take: takeNum,
    orderBy: { clickCount: "desc" },
  })

  res.json(affiliateLinks)
})

// Public API endpoints
app.get("/api/v1/brands", async (req, res) => {
  const brands = await prisma.affiliateLink.findMany({
    distinct: ["merchantId"],
    select: {
      merchant: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  })
  res.json(brands)
})

app.get("/api/v1/brands/:slug", async (req, res) => {
  const { slug } = req.params
  const merchant = await prisma.affiliateLink.findFirst({
    where: { merchantSlug: slug, status: "ACTIVE" },
    include: { program: { include: { network: true } } },
  })
  if (!merchant) return res.status(404).json({ error: "Merchant not found" })
  res.json(merchant)
})

app.get("/api/v1/categories", async (req, res) => {
  const categories = await prisma.category.findMany()
  res.json(categories)
})

app.get("/api/v1/offers", async (req, res) => {
  const { category, status, featured, sponsor } = req.query

  if (sponsor !== undefined) {
    return res.status(400).json({
      error: "Sponsor filtering is not supported by the current offer model",
    })
  }

  if (category !== undefined && typeof category !== "string") {
    return res.status(400).json({ error: "Invalid category filter" })
  }

  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !Object.values(OfferStatus).includes(status as OfferStatus))
  ) {
    return res.status(400).json({ error: "Invalid offer status" })
  }

  let featuredValue: OfferFeatured | undefined

  if (featured !== undefined) {
    if (typeof featured !== "string") {
      return res.status(400).json({ error: "Invalid featured filter" })
    }

    const normalizedFeatured =
      featured.toUpperCase() === "TRUE"
        ? "YES"
        : featured.toUpperCase() === "FALSE"
          ? "NO"
          : featured.toUpperCase()

    if (
      !Object.values(OfferFeatured).includes(
        normalizedFeatured as OfferFeatured
      )
    ) {
      return res.status(400).json({ error: "Invalid featured filter" })
    }

    featuredValue = normalizedFeatured as OfferFeatured
  }

  const where = {
    ...(typeof category === "string" && {
      category: { slug: category },
    }),
    ...(typeof status === "string" && {
      status: status as OfferStatus,
    }),
    ...(featuredValue && { featured: featuredValue }),
  }

  const offers = await prisma.offer.findMany({
    where,
    include: { merchant: true, category: true, affiliateProgram: true },
    orderBy: { clickCount: "desc" },
  })

  res.json(offers)
})

app.get("/api/v1/offers/:slug", async (req, res) => {
  const { slug } = req.params
  const offer = await prisma.offer.findFirst({
    where: { slug, status: "ACTIVE" },
    include: { merchant: true, category: true, affiliateProgram: true },
  })
  if (!offer) return res.status(404).json({ error: "Offer not found" })
  res.json(offer)
})

app.get("/api/v1/search", async (req, res) => {
  const { q, type } = req.query
  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Search query is required" })
  }

  let results: any[] = []

  if (type === "merchant" || !type) {
    results = results.concat(
      await prisma.affiliateLink.findMany({
        where: {
          OR: [
            { merchantSlug: { contains: q, mode: "insensitive" } },
            { merchant: { name: { contains: q, mode: "insensitive" } } },
          ],
          status: "ACTIVE",
        },
        include: { merchant: true, program: { include: { network: true } } },
        take: 10,
      })
    )
  }

  if (type === "offer" || !type) {
    results = results.concat(
      await prisma.offer.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
          status: "ACTIVE",
        },
        include: { merchant: true, category: true, affiliateProgram: true },
        take: 10,
      })
    )
  }

  if (type === "category" || !type) {
    results = results.concat(
      await prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 10,
      })
    )
  }

  res.json(results.filter((item, index, self) => self.indexOf(item) === index).slice(0, 10))
})

// Start the server
const PORT = process.env.API_PORT || 4000

async function startServer() {
  try {
    // Connect to database
    await prisma.$connect()

    // Start listening
    app.listen(PORT, () => {
      console.log(`ðŸš€ ClickNShop API running on port ${PORT}`)
      console.log(`ðŸ“ Environment: ${process.env.NODE_ENV || "development"}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()

// Apply authentication and authorization middleware to admin routes
app.use("/api/v1/admin/", authenticated, authorized(["ADMIN", "SUPERADMIN"]))

// Advertiser routes (authenticated advertisers only)
app.use("/api/v1/advertisers", authenticated, advertiserRoutes)

// Admin endpoints
app.get("/api/v1/admin/dashboard", authenticated, async (req, res) => {
  const merchants = await prisma.merchant.findMany({
    include: { category: true, affiliateNetwork: true, affiliateLinks: true },
    orderBy: { createdAt: "desc" },
  })
  res.json(merchants)
})

app.post("/api/v1/admin/merchants", authenticated, async (req, res) => {
  const { name, slug, description, categoryId, affiliateNetworkId, status, logoUrl, imageUrl } = req.body

  const merchant = await prisma.merchant.create({
    data: {
      name,
      slug,
      description,
      category: { connect: { id: categoryId } },
      affiliateNetwork: { connect: { id: affiliateNetworkId } },
      status: status || "ACTIVE",
      logoUrl,
      imageUrl,
    },
  })

  res.status(201).json(merchant)
})

app.use(errorHandler)

export default app
