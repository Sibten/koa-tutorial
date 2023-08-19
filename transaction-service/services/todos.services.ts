import { Context } from "koa";
import { Todos } from "../../types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../model/user.model";
import { todoModel } from "../model/todos.model";

export const createTodo = async (
  ctx: Context
): Promise<{ status: boolean; message?: string; error?: any }> => {
  const reqData = ctx.request.body as any;
  const header = ctx.request.headers;
  let token: any = header.token;

  let decode: JwtPayload = <JwtPayload>jwt.decode(token);
  let findUser = await userModel.findOne({ email: decode.email }).exec();
  const todoData: Todos = {
    name: reqData.name,
    description: reqData.desc,
    priority: reqData.priority,
    user_id: findUser?._id ?? null,
  };
  try {
    const newTask = new todoModel(todoData);
    await newTask.save();
    return { status: true, message: "task created" };
  } catch (e) {
    return { status: false, message: "error", error: e };
  }
};

export const getTodos = async (
  ctx: Context
): Promise<{ status: boolean; data?: any; error?: any }> => {
  const header = ctx.request.headers;
  let token: any = header.token;
  let decode: JwtPayload = <JwtPayload>jwt.decode(token);
  const query = ctx.request.query as any;
  let findUser = await userModel.findOne({ email: decode.email }).exec();
  try {
    const data = await todoModel.find({ user_id: findUser?._id }).exec();
    return { status: true, data: data };
  } catch (e) {
    return { status: false, error: "unable to find data" };
  }
};
