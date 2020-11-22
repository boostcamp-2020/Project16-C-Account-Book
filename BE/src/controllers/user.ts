import { Context } from 'koa';

const get = (ctx: Context): Context['body'] => {
  ctx.body = 'get';
  return ctx.body;
};

export default { get };
