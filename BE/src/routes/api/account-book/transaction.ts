import Router from 'koa-router';

import controller from '@/controllers/transaction';

const router = new Router();

// api/accountbook/:accountbookid/transaction

router.get('/csv', controller.exportCSV);

router.post('/', controller.post);
router.post('/csv', controller.importCSV);
router.get('/csv/template', controller.downloadTemplateCSV);
router.patch('/:transactionid', controller.patch);

router.delete('/:transactionid', controller.del);

export default router;
