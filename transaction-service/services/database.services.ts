import moongoose from "mongoose";
export const connectDB = () => {
  const url = process.env.MONGO_CON_URI ?? "mongodb://localhost:27017/todo";
  try {
    moongoose.connect(url);
    console.log("database is connecetd");
  } catch (e) {
    console.log("Error : ", e);
  }
};
