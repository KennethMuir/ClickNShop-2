import prisma from "../../../prisma"
import { Request, Response } from "express"



export class AdvertiserService {

  /**
   * Submit advertiser application
   */
  static async submitApplication(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const {
        companyName,
        contactPerson,
        businessEmail,
        telephone,
        website,
        businessDescription,
        verificationInfo,
      } = req.body

      if (!businessEmail) {
        return res.status(400).json({ error: "Business email is required" })
      }

      const existingAdvertiser = await prisma.advertiser.findUnique({
        where: { businessEmail },
      })

      const application = await prisma.advertiserApplication.create({
        data: {
          advertiser: existingAdvertiser
            ? {
                connect: { id: existingAdvertiser.id },
              }
            : {
                create: {
                  companyName: companyName || contactPerson || businessEmail,
                  contactPerson: contactPerson || businessEmail,
                  businessEmail,
                  telephone,
                  website,
                  businessDescription,
                  verificationInfo: verificationInfo || {},
                  status: "PENDING",
                  applicationReview: "PENDING",
                },
              },
          status: "PENDING",
          submittedAt: new Date(),
          reviewNotes: null,
        },
      })

      return res.status(201).json(application)
    } catch (error) {
      console.error("Error submitting advertiser application:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }
  /**
   * Get advertiser profile
   */
  static async getProfile(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const advertiser = await prisma.advertiser.findUnique({
        where: { businessEmail: req.user!.email },
        include: {
          campaigns: true,
          invoices: true,
        },
      })

      if (!advertiser) {
        return res.status(404).json({ error: "Advertiser not found" })
      }

      return res.json(advertiser)
    } catch (error) {
      console.error("Error fetching advertiser profile:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  /**
   * Get all campaigns for this advertiser
   */
  static async getCampaigns(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const campaigns = await prisma.campaign.findMany({
        where: { advertiser: { businessEmail: req.user!.email } },
        include: { package: true },
        orderBy: { startDate: "desc" },
      })

      return res.json(campaigns)
    } catch (error) {
      console.error("Error fetching campaigns:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  /**
   * Create a new campaign
   */
  static async createCampaign(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const {
        name,
        objective,
        placement,
        startDate,
        endDate,
        budget,
        packageId,
      } = req.body

      if (
        !name ||
        !objective ||
        !startDate ||
        !endDate ||
        !budget ||
        typeof packageId !== "string" ||
        !packageId.trim()
      ) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const selectedPackage = await prisma.advertisingPackage.findFirst({
        where: {
          id: packageId,
          status: { in: ["ACTIVE", "PROMOTIONAL"] },
        },
        select: { id: true },
      })

      if (!selectedPackage) {
        return res.status(404).json({
          error: "Advertising package not found or unavailable",
        })
      }

      const campaign = await prisma.campaign.create({
        data: {
          name,
          objective,
          placement,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          budget: Number(budget),
          advertiser: {
            connect: { businessEmail: req.user!.email },
          },
          package: {
            connect: { id: selectedPackage.id },
          },
          spent: 0,
          impressionCount: 0,
          clickCount: 0,
          clickThroughRate: 0,
        },
      })

      return res.status(201).json(campaign)
    } catch (error) {
      console.error("Error creating campaign:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }
  static async getCampaign(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const campaignId = req.params.campaignId

      if (typeof campaignId !== "string" || !campaignId.trim()) {
        return res.status(400).json({ error: "Invalid campaign ID" })
      }
      const campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
          advertiser: { businessEmail: req.user!.email },
        },
        include: { package: true },
      })

      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" })
      }

      return res.json(campaign)
    } catch (error) {
      console.error("Error fetching campaign:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  /**
   * Update a campaign
   */
  static async updateCampaign(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const campaignId = req.params.campaignId

      if (typeof campaignId !== "string" || !campaignId.trim()) {
        return res.status(400).json({ error: "Invalid campaign ID" })
      }
      const { name, objective, placement, startDate, endDate, budget } = req.body

      const campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
          advertiser: { businessEmail: req.user!.email },
        },
      })

      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" })
      }

      const updatedCampaign = await prisma.campaign.update({
        where: { id: campaignId },
        data: {
          name,
          objective,
          placement,
          startDate: startDate ? new Date(startDate) : campaign.startDate,
          endDate: endDate ? new Date(endDate) : campaign.endDate,
          budget: budget !== undefined ? Number(budget) : campaign.budget,
        },
      })

      return res.json(updatedCampaign)
    } catch (error) {
      console.error("Error updating campaign:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  /**
   * Cancel/remove a campaign
   */
  static async cancelCampaign(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const campaignId = req.params.campaignId

      if (typeof campaignId !== "string" || !campaignId.trim()) {
        return res.status(400).json({ error: "Invalid campaign ID" })
      }
      const campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
          advertiser: { businessEmail: req.user!.email },
        },
      })

      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" })
      }

      await prisma.campaign.delete({
        where: { id: campaignId },
      })

      return res.json({ message: "Campaign cancelled successfully" })
    } catch (error) {
      console.error("Error cancelling campaign:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  /**
   * Get campaign analytics
   */
  static async getAnalytics(
    req: Request,
    res: Response
  ): Promise<Response> {
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
        (sum, camp) => sum + camp.spent.toNumber(),
        0
      )

      // Calculate overall CTR
      const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

      return res.json({
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
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}




