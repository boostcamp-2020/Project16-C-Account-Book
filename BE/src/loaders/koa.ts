import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import indexRouter from '../routes/index';

const router = new Router();

export default async (app: any): Promise<void> => {
  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes()).use(router.allowedMethods());

  router.use(indexRouter.routes());
};
