import { QueryResult } from "pg";
import { TuserResponse } from "../../interfaces/user.interface";
import { client } from "../../database";
import { AppError } from "../../error";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const listUserService = async (): Promise<Array<TuserResponse>> => {
  const queryString: string = `
  SELECT
     "id",
     "name",
     "email",
     "admin",
     "active"
   FROM
      users;
  `;
  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryString
  );
  return queryResult.rows;
};
