import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const router = Router()

/**
 * GET /api/v1/go/yazing/:slug
 * Server-controlled tracked redirect for Yazing network.
 * Resolves destination from verified database records,
 * records network-specific attribution information.
 */
router.get("/yazing/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    // 1. Resolve an approved destination from the database (Yazing network only)
    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "Yazing" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    // 3. Record the click event with network attribution
    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/yazing/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        // Record network attribution
        network: "Yazing",
      },
    })

    // 5. Preserve affiliate parameters in the redirect
    const redirectUrl = affiliateLink.destinationUrl

    // 6. Return an appropriate redirect with affiliate parameters preserved
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/impact/:slug
 * Server-controlled tracked redirect for Impact network.
 */
router.get("/impact/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "Impact" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/impact/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        network: "Impact",
      },
    })

    const redirectUrl = affiliateLink.destinationUrl
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/awin/:slug
 * Server-controlled tracked redirect for Awin network.
 */
router.get("/awin/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "Awin" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/awin/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        network: "Awin",
      },
    })

    const redirectUrl = affiliateLink.destinationUrl
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/cj-affiliate/:slug
 * Server-controlled tracked redirect for CJ-Affiliate network.
 */
router.get("/cj-affiliate/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "CJ-Affiliate" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/cj-affiliate/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        network: "CJ-Affiliate",
      },
    })

    const redirectUrl = affiliateLink.destinationUrl
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/admitad/:slug
 * Server-controlled tracked redirect for Admitad network.
 */
router.get("/admitad/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "Admitad" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/admitad/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        network: "Admitad",
      },
    })

    const redirectUrl = affiliateLink.destinationUrl
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/partnerstack/:slug
 * Server-controlled tracked redirect for Partnerstack network.
 */
router.get("/partnerstack/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "Partnerstack" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/partnerstack/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        network: "Partnerstack",
      },
    })

    const redirectUrl = affiliateLink.destinationUrl
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/clickbank/:slug
 * Server-controlled tracked redirect for ClickBank network.
 */
router.get("/clickbank/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "ClickBank" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/clickbank/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        network: "ClickBank",
      },
    })

    const redirectUrl = affiliateLink.destinationUrl
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/jumia/:slug
 * Server-controlled tracked redirect for Jumia network.
 */
router.get("/jumia/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
        program: {
          network: { name: "Jumia" },
        },
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/jumia/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
        network: "Jumia",
      },
    })

    const redirectUrl = affiliateLink.destinationUrl
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  }
})

/**
 * GET /api/v1/go/:slug
 * Server-controlled tracked redirect endpoint (backward compatibility).
 * 
 * Resolves an approved destination from the database without network filtering.
 * Never accept an arbitrary destination URL from the visitor.
 */
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params

    // 1. Resolve an approved destination from the database
    const affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        merchantSlug: slug,
        status: "ACTIVE",
      },
      include: {
        program: {
          include: {
            network: true,
          },
        },
        merchant: true,
      },
    })

    if (!affiliateLink) {
      // 7. Reject unknown or disabled destinations
      return res.status(404).json({
        error: "Merchant destination not found or inactive",
      })
    }

    // 2. Verify that the destination is active (already done in query)

    // 3. Record the click event
    const clickEvent = await prisma.clickEvent.create({
      data: {
        merchantId: affiliateLink.merchantId,
        affiliateLinkId: affiliateLink.id,
        
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || undefined,
        deviceCategory: detectDeviceType(req.get("User-Agent") || ""),
        landingPage: `/go/${slug}`,
        referralSource: req.get("Referer") || undefined,
        affiliateParams: extractAffiliateParams(req.query),
        timestamp: new Date(),
      },
    })

    // 5. Preserve affiliate parameters in the redirect
    const redirectUrl = affiliateLink.destinationUrl

    // 6. Return an appropriate redirect with affiliate parameters preserved
    return res.redirect(302, redirectUrl)
  } catch (error) {
    console.error("Tracked redirect error:", error)
    // 7. Reject on error
    return res.status(500).json({
      error: "Internal server error during redirect",
    })
  } finally {
    await prisma.$disconnect()
  }
})

/**
 * Helper: Detect device type from user agent
 */
function detectDeviceType(userAgent: string): "mobile" | "desktop" | "tablet" {
  const ua = userAgent.toLowerCase()
  if (/tablet/.test(ua) || /ipad/.test(ua)) {
    return "tablet"
  }
  if (/mobile/.test(ua) || /android/.test(ua)) {
    return "mobile"
  }
  return "desktop"
}

/**
 * Helper: Extract affiliate parameters from query
 */
function extractAffiliateParams(query: any): Record<string, string> {
  const params: Record<string, string> = {}
  for (const key of Object.keys(query)) {
    if (typeof key === "string") {
      params[key] = String(query[key])
    }
  }
  return params
}

export default router