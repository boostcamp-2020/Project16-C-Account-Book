import Router from 'koa-router';

import controller from '@/controllers/auth';

const router = new Router();

// api/auth

router.post('/login', controller.login);
router.post('/refresh', controller.refresh);

export default router;
