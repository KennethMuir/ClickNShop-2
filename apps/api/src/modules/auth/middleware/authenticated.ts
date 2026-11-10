import { Request, Response, NextFunction } from "express"
import prisma from "../../../prisma"

// Simple session-based authentication for demonstration
// In production, use JWT with proper signing and refresh token rotation

export async function authenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const sessionToken = req.cookies?.session || req.headers.authorization?.split(" ")[1]

    if (!sessionToken) {
      return res.status(401).json({ error: "Authentication required" })
    }

    // Look up the refresh session
    const session = await prisma.refreshSession.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    })

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      return res.status(401).json({ error: "Invalid or expired session" })
    }

    // Attach user to request
    req.user = session.user
    next()
  } catch (error) {
    console.error("Authentication middleware error:", error)
    res.status(500).json({ error: "Authentication error" })
  }
}

// Authorization middleware - checks resource-level permissions
export function authorized(allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" })
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Insufficient permissions" })
      }

      next()
    } catch (error) {
      console.error("Authorization middleware error:", error)
      res.status(500).json({ error: "Authorization error" })
    }
  }
}

