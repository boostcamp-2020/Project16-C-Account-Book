import { Context } from 'koa';
import Router from 'koa-router';
import userRouter from './user';
import authRouter from './auth';

const router = new Router();

router.get('/', (ctx: Context) => {
  ctx.body = `GET ${ctx.path}`;
});

router.use('/user', userRouter.routes());
router.use('/auth', authRouter.routes());

export default router;
