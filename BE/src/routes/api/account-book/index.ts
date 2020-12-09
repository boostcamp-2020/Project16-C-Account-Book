import Router from 'koa-router';
import controller from '@controllers/account-book';

import transactionRouter from './transaction';
import paymentRouter from './payment';
import categoryRouter from './category';
import socialRouter from './social';

const router = new Router();

// api/accountbook
// GET accountbook list
router.get('/', controller.get);
router.post('/', controller.post);
router.patch('/:accountbookid', controller.update);
router.patch('/:accountbookid/startday', controller.updateStartday);
router.delete('/:accountbookid', controller.del);

// GET accountbook detail
router.get('/:accountbookid', controller.getDetail);

router.use('/:accountbookid/transaction', transactionRouter.routes());
router.use('/:accountbookid/payment', paymentRouter.routes());
router.use('/:accountbookid/category', categoryRouter.routes());
router.use('/:accountbookid/social', socialRouter.routes());
export default router;
