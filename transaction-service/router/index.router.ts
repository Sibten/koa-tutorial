import koaRouter from "koa-router";
import { userRouter } from "./user.router";
import { todoRouter } from "./todos.router";

export const router = new koaRouter();

router.use("/user", userRouter.routes()).use(userRouter.allowedMethods());
router.use("/todos", todoRouter.routes()).use(todoRouter.allowedMethods());
