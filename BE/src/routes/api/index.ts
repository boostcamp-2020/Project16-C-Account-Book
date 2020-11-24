import { Context } from 'koa';
import Router from 'koa-router';
import userRouter from './user';
import accountBookRouter from './account-book';

const router = new Router();

router.get('/', (ctx: Context) => {
  ctx.body = `GET ${ctx.path}`;
});

router.use('/user', userRouter.routes());
router.use('/accountbook', accountBookRouter.routes());

export default router;
