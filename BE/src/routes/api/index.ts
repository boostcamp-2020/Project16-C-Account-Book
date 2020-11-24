import { Context } from 'koa';
import Router from 'koa-router';
import userRouter from './user';
import defaultPaymentMethodRouter from './defaultPaymentMethod';

const router = new Router();

router.get('/', (ctx: Context) => {
  ctx.body = `GET ${ctx.path}`;
});

router.use('/user', userRouter.routes());
router.use('/defaultPaymentMethod', defaultPaymentMethodRouter.routes());

export default router;
