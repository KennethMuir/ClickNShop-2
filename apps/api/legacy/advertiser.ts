import { Router, Request, Response, NextFunction } from "express"
import { prisma } from "../../prisma"
import { authenticated } from "../auth/middleware"
import { authorized } from "../auth/authorized"

const router = Router()

/**
 * GET /api/v1/advertisers/profile
 * Get advertiser profile and campaigns
 */
router.get("/profile", authenticated, async (req: Request, res: Response) => {
  try {
    const advertiser = await prisma.advertiser.findUnique({
      where: { businessEmail: req.user!.email },
      include: {
        campaigns: {
          orderBy: { startDate: "desc" },
        },
        invoices: {
          orderBy: { issueDate: "desc" },
        },
      },
    })

    if (!advertiser) {
      return res.status(404).json({ error: "Advertiser not found" })
    }

    res.json(advertiser)
  } catch (error) {
    console.error("Error fetching advertiser profile:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * GET /api/v1/advertisers/campaigns
 * Get all campaigns for this advertiser
 */
router.get("/campaigns", authenticated, async (req: Request, res: Response) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { advertiser: { businessEmail: req.user!.email } },
      include: { package: true },
      orderBy: { startDate: "desc" },
    })

    res.json(campaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * POST /api/v1/advertisers/campaigns
 * Create a new campaign
 */
router.post("/campaigns", authenticated, async (req: Request, res: Response) => {
  try {
    const { name, objective, placement, startDate, endDate, budget } = req.body

    if (!name || !objective || !startDate || !endDate || !budget) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        objective: objective as string,
        placement,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: Number(budget),
        advertiser: {
          connect: { businessEmail: req.user!.email },
        },
        spent: 0,
        impressionCount: 0,
        clickCount: 0,
        clickThroughRate: 0,
      },
    })

    res.status(201).json(campaign)
  } catch (error) {
    console.error("Error creating campaign:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * GET /api/v1/advertisers/campaigns/:campaignId
 * Get a specific campaign
 */
router.get("/campaigns/:campaignId", authenticated, async (req: Request, res: Response) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.campaignId,
        advertiser: { businessEmail: req.user!.email },
      },
      include: { package: true },
    })

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" })
    }

    res.json(campaign)
  } catch (error) {
    console.error("Error fetching campaign:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * PUT /api/v1/advertisers/campaigns/:campaignId
 * Update a campaign
 */
router.put("/campaigns/:campaignId", authenticated, async (req: Request, res: Response) => {
  try {
    const { name, objective, placement, startDate, endDate, budget } = req.body

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.campaignId,
        advertiser: { businessEmail: req.user!.email },
      },
    })

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" })
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id: req.params.campaignId },
      data: {
        name,
        objective: objective as string,
        placement,
        startDate: startDate ? new Date(startDate) : campaign.startDate,
        endDate: endDate ? new Date(endDate) : campaign.endDate,
        budget: budget !== undefined ? Number(budget) : campaign.budget,
      },
    })

    res.json(updatedCampaign)
  } catch (error) {
    console.error("Error updating campaign:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * DELETE /api/v1/advertisers/campaigns/:campaignId
 * Cancel/remove a campaign
 */
router.delete("/campaigns/:campaignId", authenticated, async (req: Request, res: Response) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.campaignId,
        advertiser: { businessEmail: req.user!.email },
      },
    })

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" })
    }

    await prisma.campaign.delete({
      where: { id: req.params.campaignId },
    })

    res.json({ message: "Campaign cancelled successfully" })
  } catch (error) {
    console.error("Error cancelling campaign:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * GET /api/v1/advertisers/analytics
 * Get campaign analytics
 */
router.get("/analytics", authenticated, async (req: Request, res: Response) => {
  try {
    const campaignId = req.query.campaignId as string | undefined

    const where = campaignId
      ? { id: campaignId, advertiser: { businessEmail: req.user!.email } }
      : { advertiser: { businessEmail: req.user!.email } }

    const campaigns = await prisma.campaign.findMany({
      where,
      include: { package: true },
    })

    // Calculate analytics across all campaigns
    const totalImpressions = campaigns.reduce(
      (sum, camp) => sum + camp.impressionCount,
      0
    )
    const totalClicks = campaigns.reduce(
      (sum, camp) => sum + camp.clickCount,
      0
    )
    const totalSpent = campaigns.reduce(
      (sum, camp) => sum + camp.spent,
      0
    )

    // Calculate overall CTR
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

    res.json({
      campaigns,
      summary: {
        totalCampaigns: campaigns.length,
        totalImpressions,
        totalClicks,
        ctr: ctr.toFixed(2),
        totalSpent,
      },
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router