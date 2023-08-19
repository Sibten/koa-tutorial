import koaRouter from "koa-router";
import { authenticateUser } from "../../middleware/user.auth";
import { TodoContoroller } from "../controller/todos.controller";
export const todoRouter = new koaRouter();
const todoController = new TodoContoroller();
todoRouter.use(authenticateUser);
todoRouter.post("/create", todoController.createTodos);
