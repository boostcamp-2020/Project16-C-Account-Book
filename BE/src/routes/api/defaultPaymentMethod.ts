import Router from 'koa-router';

import controller from '@/controllers/defaultPaymentMethod';

const router = new Router();

// api/defaultPaymentMethod

router.get('/', controller.get);

export default router;
