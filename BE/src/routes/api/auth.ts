import Router from 'koa-router';
import controller from '@controllers/auth';

const router = new Router();

router.post('/login', controller.login);
router.post('/refresh', controller.refresh);

export default router;
