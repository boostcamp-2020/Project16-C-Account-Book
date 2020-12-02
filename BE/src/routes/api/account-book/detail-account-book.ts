import Router from 'koa-router';

import Controller from '@controllers/detail-account-book';

import transactionRouter from './transaction';
import paymentRouter from './payment';
import categoryRouter from './category';

const router = new Router();

// api/accountbook/:accountbookid

router.get('/', Controller.get);

router.use('/transaction', transactionRouter.routes());
router.use('/payment', paymentRouter.routes());
router.use('/category', categoryRouter.routes());

export default router;
