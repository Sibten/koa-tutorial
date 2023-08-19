import koa from "koa";
import koaRouter from "koa-router";
import env from "dotenv";
import koaBodyParser from "koa-bodyparser";
import multer from "koa-multer";
const app = new koa();

env.config();

const PORT = process.env.PORT ?? 3000;

const router = new koaRouter();
app.use(koaBodyParser());
app.use(router.routes()).use(router.allowedMethods());
const upload = multer({
  storage: multer.memoryStorage(),
});

router
  .get("/", (ctx: koa.Context, next: koa.Next) => {
    ctx.body = { mesage: "hello" };
    //  ctx.message = "hello" ;  Message
  })
  .post("/bodygreet", (ctx: koa.Context, next: koa.Next) => {
    const body: any = ctx.request.body;

    console.log(body.name);

    ctx.message = `Hello ${body.name}`;
  })
  .get("/querygreet", (ctx: koa.Context) => {
    const query: any = ctx.request.query;
    ctx.message = `<h1> ${query.name}! whats up dude </h1>`;
  })
  .post("/file", upload.single("document"), (ctx: koa.Context) => {
    const file = ctx.req;
    console.log(file);

    ctx.status = 200;
  });

app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});
