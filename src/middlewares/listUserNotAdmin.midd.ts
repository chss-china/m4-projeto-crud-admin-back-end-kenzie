import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
export const verifyNotAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { decoded } = res.locals;
  if (decoded.admin == false) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};
