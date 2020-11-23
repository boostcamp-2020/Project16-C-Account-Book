import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from 'koa-logger';

import { errorCatcher, errorHandler } from '@/loaders/error';
import indexRouter from '../routes/index';

const router = new Router();

export default async (app: any): Promise<void> => {
  app.use(errorCatcher);
  app.use(cors());
  app.use(bodyParser());
  app.use(logger());
  app.use(router.routes()).use(router.allowedMethods());
  app.on('error', errorHandler);

  router.use(indexRouter.routes());
};
