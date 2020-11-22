import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import home from '../routes/index';

const router = new Router();

export default async (app: any): Promise<void> => {
  app.use(cors());
  app.use(bodyParser());

  router.use('/', home.routes());
  app.use(router.routes());
  app.use(router.allowedMethods());
};
