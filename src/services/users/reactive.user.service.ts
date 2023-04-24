import format from "pg-format";
import { TuserResponse } from "../../interfaces/user.interface";
import { QueryConfig } from "pg";
import { QueryResult } from "pg";
import { client } from "../../database";
export const reactivateUserService = async (
  id: number
): Promise<TuserResponse> => {
  const queryString: string = format(
    `
            UPDATE users
            SET(active) = ROW(true)
            WHERE id = $1
            RETURNING "id","name","email","admin","active";
            `
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryConfig
  );
  const reactiveUser = queryResult.rows[0];

  return reactiveUser;
};
