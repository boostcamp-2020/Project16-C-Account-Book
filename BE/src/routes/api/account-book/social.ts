import Router from 'koa-router';

import controller from '@controllers/social';

const router = new Router();

// api/accountbook/:accountbookid/social

router.get('/code', controller.get);
router.post('/user', controller.post);
router.delete('/user', controller.del);
export default router;
