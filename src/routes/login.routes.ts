import { Router, Request, Response } from "express";
import { createLoginControllers } from "../controllers/login.controllers";
import { loginMiddValidBody } from "../middlewares/login.body.valid.midd";
import { createSchemaLoginRequest } from "../schemas/user.schemas";
export const userRoutesLogin: Router = Router();
userRoutesLogin.post(
  "",
  loginMiddValidBody(createSchemaLoginRequest),
  createLoginControllers
);
