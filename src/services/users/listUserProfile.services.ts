import { TuserResponse } from "../../interfaces/user.interface";
import { QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
export const listUserProfileServices = async (
  decoded: any
): Promise<Array<TuserResponse>> => {
  console.log(decoded);

  console.log(decoded.active);
  if (decoded.active !== true) {
    throw new AppError("", 400);
  }
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
