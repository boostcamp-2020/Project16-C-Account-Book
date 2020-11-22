import { Context } from 'koa';
import Router from 'koa-router';
import userRouter from './user';

const router = new Router();

router.get('/', (ctx: Context): void => {
  ctx.body = 'home';
});
router.use('/user', userRouter.routes());
// ...

export default router;
