import { QueryResult } from "pg";
import { client } from "../../database";
import {
  TtokenLogin,
  Tuser,
  userLoginRequest,
} from "../../interfaces/user.interface";
import format from "pg-format";
import { AppError } from "../../error";
import { compareSync } from "bcryptjs";
import { createUserSchema } from "../../schemas/user.schemas";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import jwt from "jsonwebtoken";
export const loginCreateServices = async (
  body: userLoginRequest
): Promise<TtokenLogin> => {
  const { email, password } = body;

  const queryTemplate: string = `
  SELECT * FROM 
  users
  WHERE 
    email = (%L);
  `;

  const queryFormat: string = format(queryTemplate, email);
  const queryResult: QueryResult<Tuser> = await client.query(queryFormat);
  const user: Tuser = queryResult.rows[0];

  if (queryResult.rowCount == 0) {
    throw new AppError("Wrong email/password", 401);
  }
  if (user.active == false) {
    throw new AppError("Wrong email/password", 401);
  }
  const passwordIsValid: boolean = compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      email: user.email,
      admin: user.admin,
      active: user.active,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );
  return { token };
};
