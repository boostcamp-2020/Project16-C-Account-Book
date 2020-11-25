import Router from 'koa-router';
import controller from '../../controllers/account-book';

const router = new Router();

router.get('/', controller.get);
router.post('/', controller.post);

export default router;
