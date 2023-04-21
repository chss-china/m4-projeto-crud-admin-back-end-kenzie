import { Router, Request, Response } from "express";
import {
  createUserControllers,
  listUserControllers,
  listUserProfileControllers,
  updateUserControllers,
} from "../controllers/user.controllers";
import { verifyEmailExistsMidd } from "../middlewares/user.midd";
import { updateUserService } from "../services/users/updateUser.services";
import { verifyBodyValid } from "../middlewares/body.valid.midd";
import {
  createUserRequestSchema,
  updateUserSchema,
} from "../schemas/user.schemas";
import { verifyTokenValidMidd } from "../middlewares/tokenIsValidmidd";
import { verifyNotAdmin } from "../middlewares/listUserNotAdmin.midd";
import { updateVerifyNotAdmin } from "../middlewares/updateUserNotAdmin";
import { verfifyIdUser } from "../middlewares/verifyIdUser";
const userRoutes: Router = Router();
userRoutes.post(
  "",
  verifyBodyValid(createUserRequestSchema),
  verifyEmailExistsMidd,
  createUserControllers
);
userRoutes.get("", verifyTokenValidMidd, verifyNotAdmin, listUserControllers);
userRoutes.get("/profile", verifyTokenValidMidd, listUserProfileControllers);
userRoutes.patch(
  "/:id",
  verfifyIdUser,
  verifyBodyValid(updateUserSchema),
  verifyTokenValidMidd,
  updateVerifyNotAdmin,
  updateUserControllers
);
userRoutes.delete(
  "/:id",
  verfifyIdUser,
  verifyTokenValidMidd,
  updateVerifyNotAdmin
);
userRoutes.put("/:id/recover", verfifyIdUser, verifyNotAdmin);
export default userRoutes;
