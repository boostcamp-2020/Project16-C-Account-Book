import Router from 'koa-router';

import controller from '@/controllers/social';

const router = new Router();

// api/social

router.post('/user', controller.post);

router.delete('/:accountbookid/user', controller.del);

export default router;
