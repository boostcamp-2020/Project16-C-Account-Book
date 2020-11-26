import Router from 'koa-router';
import controller from '../../controllers/defaultPaymentMethod';

const router = new Router();

router.get('/', controller.get);

export default router;
