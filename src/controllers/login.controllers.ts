import {
  TtokenLogin,
  Tuser,
  TuserRequest,
  userLoginRequest,
} from "../interfaces/user.interface";
import {
  createSchemaLoginRequest,
  createUserSchema,
} from "../schemas/user.schemas";
import { createUserService } from "../services/users/createUser.service";
import { loginCreateServices } from "../services/login/login.user.service";
import { Request, Response } from "express";

export const createLoginControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: userLoginRequest = req.body;
  const token: TtokenLogin = await loginCreateServices(body);
  return res.status(200).json(token);
};
