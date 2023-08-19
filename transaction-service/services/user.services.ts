import koa from "koa";
import { userModel } from "../model/user.model";
import { User } from "../../types";
import { validateMail } from "../helper/methods";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const createUser = async (
  ctx: koa.Context
): Promise<{ status: boolean; error?: any }> => {
  const reqData = ctx.request.body as any;
  const user: User = {
    name: reqData.name,
    email: reqData.email,
    password: reqData.password,
  };
  user.password = await bcrypt.hash(user.password, 8);
  if (validateMail(user.email)) {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return { status: true };
    } catch (e) {
      return { status: false, error: e };
    }
  } else {
    return { status: false, error: "mail validation failed" };
  }
};

export const loginUser = async (
  ctx: koa.Context
): Promise<{ status: boolean; token?: string; error?: any }> => {
  const reqData = ctx.request.body as any;
  const userData: User = {
    email: reqData.email,
    password: reqData.password,
  };
  const findUser = await userModel.findOne({ email: userData.email }).exec();
  const comp = await bcrypt.compare(userData.password, findUser?.password!);
  if (comp && findUser) {
    const payload = { email: findUser.email };
    const secKey = process.env.SEC_KEY ?? "todosec_key";
    const token = jwt.sign(payload, secKey);
    return { status: true, token: token };
  } else {
    return { status: false, error: "Incorrect password or username!" };
  }
};
