import Router from 'koa-router';

const userRouter = new Router();

userRouter.get('/', (ctx, next) => {
  ctx.body = 'user router';
});

export default userRouter;
