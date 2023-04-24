import {
  TtokenLogin,
  Tuser,
  TuserRequest,
  userLoginRequest,
} from "../interfaces/user.interface";

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
