import { Context } from 'koa';

const get = (ctx: Context): Context['body'] => {
  ctx.body = `GET ${ctx.path}`;
  return ctx.body;
};

export default { get };
