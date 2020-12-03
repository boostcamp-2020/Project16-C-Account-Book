import Router from 'koa-router';

import Controller from '@controllers/category';

const router = new Router();

// api/accountbook/:accountbookid/category

router.post('/', Controller.post);
router.patch('/:categoryid', Controller.patch);
router.delete('/:categoryid', Controller.del);

export default router;
