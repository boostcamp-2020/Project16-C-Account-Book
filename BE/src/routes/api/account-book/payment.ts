import Router from 'koa-router';

import controller from '@/controllers/payment';

const router = new Router();

// api/accountbook/:accountbookid/payment

router.post('/', controller.post);

router.patch('/:paymentid', controller.patch);

router.delete('/:paymentid', controller.del);

export default router;
