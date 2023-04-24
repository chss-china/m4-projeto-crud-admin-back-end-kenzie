import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { Tuser } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";
export const verfifyIdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);
  const queryString: string = `
    SELECT  * 
    FROM
      users
    WHERE 
     id = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult<Tuser> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};
