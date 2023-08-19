import mongoose from "mongoose";

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface Todos {
  name: string;
  description: string;
  user_id: mongoose.Types.ObjectId | null;
  priority: number;
}
