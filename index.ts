import koa from "koa";
import koaBody from "koa-bodyparser";
import env from "dotenv";
import { connectDB } from "./transaction-service/services/database.services";
import { router } from "./transaction-service/router/index.router";

const app = new koa();

env.config();
app.use(koaBody());

const PORT = process.env.PORT ?? 3000;

function main() {
  connectDB();
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
  });
}
main();
