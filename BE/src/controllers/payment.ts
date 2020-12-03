import { Context } from 'koa';

const post = (ctx: Context): Context['body'] => {
  ctx.body = `POST ${ctx.url}`;
  return ctx.body;
};

const patch = (ctx: Context): Context['body'] => {
  ctx.body = `PATCH ${ctx.url}`;
  return ctx.body;
};

const del = (ctx: Context): Context['body'] => {
  ctx.body = `DELETE ${ctx.url}`;
  return ctx.body;
};

export default { post, patch, del };
