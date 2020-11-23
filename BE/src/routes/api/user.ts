import Router from 'koa-router';
import controller from '../../controllers/user';

const router = new Router();

router.get('/', controller.get);
router.post('/', controller.post);
router.patch('/');
router.delete('/');

export default router;
