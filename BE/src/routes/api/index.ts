import { Context } from 'koa';
import Router from 'koa-router';

import authController from '@controllers/auth';
import authRouter from './auth';
import accountBookRouter from './account-book';
import defaultPaymentMethodRouter from './defaultPaymentMethod';
import socialRouter from './social';

const router = new Router();

router.get('/', (ctx: Context, next) => {
  ctx.body = `GET ${ctx.path}`;
  next();
});

router.use('/auth', authRouter.routes());

router.use(authController.checkToken);

router.use('/accountbook', accountBookRouter.routes());
router.use('/social/accountbook', socialRouter.routes());
router.use('/defaultPaymentMethod', defaultPaymentMethodRouter.routes());

export default router;
