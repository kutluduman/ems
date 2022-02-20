import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import config from "../config";

const { JWT_SECRET } = config;

export default (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add employee from payload
    req.employee = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
