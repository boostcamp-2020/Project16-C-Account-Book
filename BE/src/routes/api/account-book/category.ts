import Router from 'koa-router';

import controller from '@/controllers/category';

const router = new Router();

// api/accountbook/:accountbookid/category

router.post('/', controller.post);

router.patch('/:categoryid', controller.patch);

router.delete('/:categoryid', controller.del);

export default router;
