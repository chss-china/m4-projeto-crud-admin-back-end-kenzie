import "express-async-errors";
import express, { Application, json } from "express";
import userRoutes from "./routes/users.route";
import { middHandleError } from "./error";
import { userRoutesLogin } from "./routes/login.routes";
const app: Application = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", userRoutesLogin);

app.use(middHandleError);
export default app;
