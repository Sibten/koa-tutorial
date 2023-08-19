import koa from "koa";
import { createTodo } from "../services/todos.services";

export class TodoContoroller {
  async createTodos(ctx: koa.Context) {
    const res = await createTodo(ctx);
    ctx.body = res;
    if (res.status) ctx.status = 200;
    else ctx.status = 400;
  }
}
