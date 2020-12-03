import Router from 'koa-router';

import Controller from '@controllers/payment';

const router = new Router();

// api/accountbook/:accountbookid/payment
router.post('/', Controller.post);
router.patch('/:paymentid', Controller.patch);
router.delete('/:paymentid', Controller.del);

export default router;
