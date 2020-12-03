import Router from 'koa-router';

import Controller from '@controllers/transaction';

const router = new Router();

// api/accountbook/:accountbookid/transaction

router.post('/', Controller.post);
router.patch('/:transactionid', Controller.patch);
router.delete('/:transactionid', Controller.del);

export default router;
