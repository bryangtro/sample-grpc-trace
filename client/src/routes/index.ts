import compose from "koa-compose";
import Router, { Middleware } from "@koa/router";
import userRouter from "./user-routes/index";

const routers: Router[] = [
    userRouter,
];

const middleware: Middleware[] = [];

routers.forEach((router) => {
    middleware.push(router.routes());
    middleware.push(router.allowedMethods());
});

export default compose(middleware);
