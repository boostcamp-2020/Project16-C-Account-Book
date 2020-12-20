import Router from 'koa-router';

import controller from '@/controllers/account-book';

import transactionRouter from '@/routes/api/account-book/transaction';
import paymentRouter from '@/routes/api/account-book/payment';
import categoryRouter from '@/routes/api/account-book/category';

const router = new Router();

// api/accountbook

router.get('/', controller.get);
router.get('/:accountbookid', controller.getDetail);
router.get('/:accountbookid/code', controller.getCode);
router.get('/:accountbookid/year/:year/month/:month', controller.getTransaction);

router.post('/', controller.post);

router.patch('/:accountbookid', controller.update);
router.patch('/:accountbookid/startday', controller.updateStartday);

router.delete('/:accountbookid', controller.del);

router.use('/:accountbookid/transaction', transactionRouter.routes());
router.use('/:accountbookid/payment', paymentRouter.routes());
router.use('/:accountbookid/category', categoryRouter.routes());
export default router;
