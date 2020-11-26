
import { Context } from 'koa';
import Router from 'koa-router';
import apiRouter from './api/index';

const router = new Router();

router.get('/', (ctx: Context) => {
  ctx.body = `GET ${ctx.path}`;
});

router.use('/api', apiRouter.routes());

export default router;
