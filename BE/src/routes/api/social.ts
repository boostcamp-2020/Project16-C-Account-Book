import Router from 'koa-router';

import controller from '@controllers/social';

const router = new Router();

// api/social

router.post('/user/accountbook', controller.post);
router.delete('/user/accountbook/:accountbookid', controller.del);
export default router;
