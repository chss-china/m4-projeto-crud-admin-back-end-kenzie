import { Request, Response } from "express";
import format from "pg-format";
import { QueryConfig } from "pg";
import { QueryResult } from "pg";
import { client } from "../../database";
import {
  TuserRequest,
  TuserResponse,
  updateRequestUser,
} from "../../interfaces/user.interface";
import { createSchemaResponse } from "../../schemas/user.schemas";
export const updateUserService = async (
  userData: updateRequestUser,
  id: number
): Promise<TuserResponse> => {
  //const id: number = parseInt(req.params.id);
  //const userData: Partial<TuserRequest> = req.body;

  const queryString: string = format(
    `
    UPDATE users
    SET(%I) = ROW(%L)
    WHERE id = $1
    RETURNING "id","name","email","admin","active";
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryConfig
  );
  const updatedUser = createSchemaResponse.parse(queryResult.rows[0]);
  return updatedUser;
};
