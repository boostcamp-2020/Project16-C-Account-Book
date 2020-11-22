import createError from 'http-errors';
import Router from 'koa-router';

const indexRouter = new Router();

indexRouter.get('/', (ctx, next) => {
  const error = createError(402, 'error error wow');

  throw error;
});

export default indexRouter;
