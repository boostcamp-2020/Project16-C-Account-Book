import Router from 'koa-router';

const transactionRouter = new Router();

transactionRouter.get('/', (ctx, next) => {
  ctx.body = 'transaction router';
});

export default transactionRouter;
