import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig } from "pg";
import { QueryResult } from "pg";
import { client } from "../database";
export const verifyActiveExistsMidd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let valueActive = true;
  const queryString: string = `
   SELECT 
      *
   FROM
      users
   WHERE
   active = true;
    `;

  const queryResult: QueryResult = await client.query(queryString);

  if (queryResult.rowCount > 0) {
    throw new AppError("User already active", 400);
  }

  return next();
};
