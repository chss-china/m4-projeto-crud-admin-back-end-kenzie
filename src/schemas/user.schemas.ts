import { z } from "zod";

const createUserSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(3),
  admin: z.boolean().optional(),
  active: z.boolean(),
});
const createUserRequestSchema = createUserSchema.omit({
  id: true,
  active: true,
});
const createSchemaResponse = createUserSchema.omit({
  password: true,
});
const updateUserSchema = createUserSchema.partial().omit({
  id: true,
  active: true,
  admin: true,
  password: true,
});
const createSchemaLoginRequest = createUserSchema.omit({
  id: true,
  name: true,
  admin: true,
  active: true,
});
const createSchemaToken = z.object({
  token: z.string(),
});
export {
  createSchemaResponse,
  createUserSchema,
  updateUserSchema,
  createUserRequestSchema,
  createSchemaLoginRequest,
  createSchemaToken,
};
