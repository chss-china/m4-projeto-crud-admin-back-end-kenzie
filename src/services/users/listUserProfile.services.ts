import { TuserResponse } from "../../interfaces/user.interface";
import { QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";

export const listUserProfileServices = async (
  decoded: any
): Promise<TuserResponse | any> => {
  const queryString: string = `
        SELECT
           "id",
           "name",
           "email",
           "admin",
           "active"
         FROM
            users
        WHERE id = $1;
        `;
  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryString,
    [decoded.sub]
  );

  return queryResult.rows[0];
};
