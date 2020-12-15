import Router from 'koa-router';

import Controller from '@controllers/transaction';

const router = new Router();

// api/accountbook/:accountbookid/transaction

router.get('/csv', Controller.exportCSV);
router.get('/year/:year/month/:month', Controller.exportCSV);
router.post('/', Controller.post);
router.post('/csv', Controller.importCSV);
router.get('/csv/template', Controller.downloadTemplateCSV);
router.patch('/:transactionid', Controller.patch);
router.delete('/:transactionid', Controller.del);

export default router;
