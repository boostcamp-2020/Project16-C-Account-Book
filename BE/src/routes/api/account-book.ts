import Router from 'koa-router';
import controller from '../../controllers/account-book';

const router = new Router();

router.get('/', controller.get);

export default router;
