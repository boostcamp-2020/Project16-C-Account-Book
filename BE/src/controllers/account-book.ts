import { Context } from 'koa';
import service from '@services/account-book';
import Response from '@interfaces/response';

const get = async (ctx: Context): Promise<Context['body']> => {
  const accountBooks = await service.get(ctx);
  const response: Response = {
    status: 200,
    message: 'success',
    data: accountBooks,
  };
  ctx.status = response.status;
  ctx.body = response;

  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const accountBook = await service.post(ctx);
  const response: Response = {
    status: 200,
    message: 'success',
    data: accountBook,
  };
  ctx.status = response.status;
  ctx.body = response;

  return ctx.body;
};

const update = async (ctx: Context): Promise<Context['body']> => {
  const updateResult = await service.patch(ctx);
  const response: Response = {
    status: 200,
    message: 'success',
    data: updateResult,
  };
  ctx.status = response.status;
  ctx.body = response;

  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const deleteResult = await service.del(ctx);
  const response: Response = {
    status: 200,
    message: 'success',
    data: deleteResult,
  };
  ctx.status = response.status;
  ctx.body = response;

  return ctx.body;
};

const getDetail = async (ctx: Context): Promise<Context['body']> => {
  ctx.body = `GET ${ctx.url}`;
  return ctx.body;
};
export default { get, post, update, del, getDetail };
