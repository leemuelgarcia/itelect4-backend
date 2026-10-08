import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authentication token is required",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Authentication token is required",
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({
      message: "JWT secret is not configured",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};