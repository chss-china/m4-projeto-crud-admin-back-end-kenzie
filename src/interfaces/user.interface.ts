import { z } from "zod";
import {
  createUserRequestSchema,
  createUserSchema,
  createSchemaResponse,
  updateUserSchema,
  createSchemaLoginRequest,
  createSchemaToken,
} from "../schemas/user.schemas";
type Tuser = z.infer<typeof createUserSchema>;
type TuserRequest = z.infer<typeof createUserRequestSchema>;
type TuserResponse = z.infer<typeof createSchemaResponse>;
type updateRequestUser = z.infer<typeof updateUserSchema>;
type userLoginRequest = z.infer<typeof createSchemaLoginRequest>;
type TtokenLogin = z.infer<typeof createSchemaToken>;

export {
  Tuser,
  TuserRequest,
  TuserResponse,
  updateRequestUser,
  userLoginRequest,
  TtokenLogin,
};
