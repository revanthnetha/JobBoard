import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction):Promise<void> |undefined => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded;  
    next();
  } catch (error) {
   res.status(403).json({ message: "Invalid or expired token" });
   return;
  }
};
