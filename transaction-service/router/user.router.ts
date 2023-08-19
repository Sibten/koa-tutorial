import koaRouter from "koa-router";
import { UserController } from "../controller/user.controller";

export const userRouter = new koaRouter();
const userController = new UserController();
userRouter.post("/create", (ctx) => userController.createUser(ctx));
userRouter.post("/login", (ctx) => userController.loginUser(ctx));
