import { Context, Request, Response } from 'koa';
import Router from 'koa-router';
import apiRouter from './api/index';

const home = new Router();

home.get('/', (ctx: Context) => {
  ctx.body = 'home';
});

home.use('/api', apiRouter.routes());

export default home;
