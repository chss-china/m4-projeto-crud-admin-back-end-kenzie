import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
export const updateVerifyNotAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { decoded } = res.locals;
  const id = parseInt(req.params.id);

  if (decoded.admin == false && parseInt(decoded.sub) !== id) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};
