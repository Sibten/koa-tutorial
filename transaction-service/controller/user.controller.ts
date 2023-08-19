import koa from "koa";
import { createUser, loginUser } from "../services/user.services";

export class UserController {
  async createUser(ctx: koa.Context) {
    const res = await createUser(ctx);
    if (res.status) {
      ctx.body = { message: "User Created" };
      ctx.status = 200;
    } else {
      ctx.status = 400;
      ctx.body = { message: "Somthing bad happen", error: res.error };
    }
  }

  async loginUser(ctx: koa.Context) {
    const res = await loginUser(ctx);
    if (res.status) {
      ctx.body = res;
      ctx.status = 200;
    } else {
      ctx.status = 401;
      ctx.body = res;
    }
  }
}
