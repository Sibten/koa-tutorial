import jwt from "jsonwebtoken";
import { Context, Next } from "koa";

export const authenticateUser = async (ctx: Context, next: Next) => {
  try {
    const header = ctx.request.headers;

    const secKey = process.env.SEC_KEY ?? "todosec_key";
    let token: any = header.token;
    const res = jwt.verify(token, secKey);
    if (res) {
      await next();
    } else {
      ctx.body = { error: 1, error_desc: "user is not authorized" };
      ctx.status = 401;
    }
  } catch (e) {
    ctx.body = { error: 1, error_desc: e };
    ctx.status = 400;
  }
};
