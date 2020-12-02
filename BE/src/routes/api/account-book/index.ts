import Router from 'koa-router';
import controller from '@controllers/account-book';

import detailAccountBookRouter from './detail-account-book';

const router = new Router();

// api/accountbook
router.get('/', controller.get);
router.post('/', controller.post);
router.patch('/:accountbookid');
router.delete('/:accountbookid');

router.use('/:accountbookid', detailAccountBookRouter.routes());

export default router;
