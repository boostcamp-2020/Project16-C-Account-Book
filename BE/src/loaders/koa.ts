import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from 'koa-logger';

import { errorCatcher, errorHandler } from '@/loaders/error';
import indexRouter from '@/routes';

const router = new Router();

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>): void => {
  app.use(errorCatcher);
  app.use(cors());
  app.use(bodyParser());
  app.use(logger());
  app.use(router.routes()).use(router.allowedMethods());
  app.on('error', errorHandler);

  router.use(indexRouter.routes());
};
