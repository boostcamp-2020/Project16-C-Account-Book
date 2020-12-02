import { Context } from 'koa';

const get = (ctx: Context): Context['body'] => {
  ctx.body = `GET ${ctx.url}`;
  return ctx.body;
};

export default { get };
