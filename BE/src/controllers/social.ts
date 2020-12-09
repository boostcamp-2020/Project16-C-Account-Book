import { Context } from 'koa';

const get = (ctx: Context): Context['body'] => {
  ctx.body = `/GET ${ctx.url}`;
  return ctx.body;
};

const post = (ctx: Context): Context['body'] => {
  ctx.body = `/POST ${ctx.url}`;
  return ctx.body;
};

const del = (ctx: Context): Context['body'] => {
  ctx.body = `/DELETE ${ctx.url}`;
  return ctx.body;
};

export default { get, post, del };
