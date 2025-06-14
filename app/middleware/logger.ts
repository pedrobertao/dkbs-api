import { Request, Response, NextFunction } from "express";

export function customLogger(req: Request, _: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next();
}
