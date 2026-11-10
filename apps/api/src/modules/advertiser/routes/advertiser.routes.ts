import { Router, Request, Response, NextFunction } from "express"
import { authenticated } from "../../auth/middleware/authenticated"
import { AdvertiserService } from "../services/advertiser.service"

const router = Router()

/**
 * POST /api/v1/advertisers/apply
 * Submit advertiser application
 */
router.post("/apply", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.submitApplication(req, res)
})

/**
 * GET /api/v1/advertisers/profile
 * Get advertiser profile
 */
router.get("/profile", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.getProfile(req, res)
})

/**
 * GET /api/v1/advertisers/campaigns
 * Get all campaigns for this advertiser
 */
router.get("/campaigns", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.getCampaigns(req, res)
})

/**
 * POST /api/v1/advertisers/campaigns
 * Create a new campaign
 */
router.post("/campaigns", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.createCampaign(req, res)
})

/**
 * GET /api/v1/advertisers/campaigns/:campaignId
 * Get a specific campaign
 */
router.get("/campaigns/:campaignId", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.getCampaign(req, res)
})

/**
 * PUT /api/v1/advertisers/campaigns/:campaignId
 * Update a campaign
 */
router.put("/campaigns/:campaignId", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.updateCampaign(req, res)
})

/**
 * DELETE /api/v1/advertisers/campaigns/:campaignId
 * Cancel/remove a campaign
 */
router.delete("/campaigns/:campaignId", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.cancelCampaign(req, res)
})

/**
 * GET /api/v1/advertisers/analytics
 * Get campaign analytics
 */
router.get("/analytics", authenticated, async (req: Request, res: Response) => {
  return AdvertiserService.getAnalytics(req, res)
})

export default router
