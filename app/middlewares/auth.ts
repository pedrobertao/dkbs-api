import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { JWT_SECRET } from "../services/env";
import { AuthenticatedRequest } from "../types/requests";
import { User } from "../models/user";

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Token missing" });

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Token invalid" });
    }
    req.user = user as User;
    next();
  });
}
