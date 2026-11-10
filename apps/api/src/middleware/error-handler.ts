import { Request, Response, NextFunction } from "express"
import prisma from "../prisma"

export async function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error handler caught:", {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  })

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate field value entered" })
  }

  // Validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val: any) => val.message)
    return res.status(400).json({ error: messages.join(", ") })
  }

  // Cast error
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" })
  }

  // Send generic error response (don't leak stack in production)
  const statusCode = err.statusCode || 500
  const message = process.env.NODE_ENV === "development" ? err.message : "Internal server error"

  res.status(statusCode).json({ error: message })
}
