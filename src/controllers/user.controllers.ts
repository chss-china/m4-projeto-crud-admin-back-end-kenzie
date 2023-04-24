import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import {
  TuserRequest,
  TuserResponse,
  updateRequestUser,
} from "../interfaces/user.interface";
import { listUserService } from "../services/users/listUser.service";
import { updateUserService } from "../services/users/updateUser.services";

import { listUserProfileServices } from "../services/users/listUserProfile.services";
import { deleteSoftService } from "../services/users/softdelete.service";
import { reactivateUserService } from "../services/users/reactive.user.service";
export const createUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TuserRequest = req.body;
  const newUser: TuserResponse = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const listUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: string | undefined = req.headers.authorization;
  const listUser = await listUserService();
  return res.json(listUser);
};
export const listUserProfileControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { decoded } = res.locals;
  const listUserProfile = await listUserProfileServices(decoded);
  return res.status(200).json(listUserProfile);
};
export const updateUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: updateRequestUser = req.body;
  const id: number = parseInt(req.params.id);
  const updateUser: TuserResponse = await updateUserService(userData, id);
  return res.status(200).json(updateUser);
};
export const deleteSoftControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const deleteSoftActive = await deleteSoftService(id);
  return res.status(204).json(deleteSoftActive);
};
export const reactivateUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const reactivateUser = await reactivateUserService(id);
  return res.status(200).json(reactivateUser);
};
