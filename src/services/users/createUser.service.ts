import format from "pg-format";
import { TuserRequest, TuserResponse } from "../../interfaces/user.interface";
import { QueryResult } from "pg";
import { client } from "../../database";
import { createSchemaResponse } from "../../schemas/user.schemas";
import { hash, hashSync } from "bcryptjs";
import * as bcrypt from "bcryptjs";

export const createUserService = async (
  userData: TuserRequest
): Promise<TuserResponse> => {
  userData.password = await bcrypt.hash(userData.password, 10);
  const queryString: string = format(
    `
    INSERT INTO
       users(%I)
    VALUES
       (%L)
    RETURNING 
       "id","name","email","admin","active";
  `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryString
  );
  const newUser = createSchemaResponse.parse(queryResult.rows[0]);
  return newUser;
};
