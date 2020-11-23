import Router from 'koa-router';

import transactionRouter from '@/api/transaction';
import userRouter from '@/api/user';

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/', (ctx, next) => {
  ctx.body = 'root router';
});

apiRouter.use('/transaction', transactionRouter.routes());
apiRouter.use('/user', userRouter.routes());

export default apiRouter;
