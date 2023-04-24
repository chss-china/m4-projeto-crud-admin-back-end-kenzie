import format from "pg-format";
import { QueryConfig } from "pg";
import { QueryResult } from "pg";
import { TuserResponse } from "../../interfaces/user.interface";
import { client } from "../../database";
export const deleteSoftService = async (id: number): Promise<TuserResponse> => {
  const queryString: string = format(
    `
        UPDATE users
        SET(active) = ROW(false)
        WHERE id = $1
        
        `
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryConfig
  );
  const softDeleteUser = queryResult.rows[0];
  return softDeleteUser;
};
