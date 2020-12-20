import { Context } from 'koa';

import service from '@/services/account-book';

import response from '@/utils/response';

const get = async (ctx: Context): Promise<Context['body']> => {
  const userInfo = ctx.user;
  const accountBooks = await service.get(userInfo);
  const res = response(200, accountBooks);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const getDetail = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const accountBook = await service.getDetail(params);
  const res = response(200, accountBook);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const getCode = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const code = await service.getCode(params);
  const res = response(200, code);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const getTransaction = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const accountBook = await service.getTransaction(params);
  const res = response(200, accountBook);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const userInfo = ctx.user;
  const { body } = ctx.request;
  const accountBook = await service.post(userInfo, body);
  const res = response(200, accountBook);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const update = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const { body } = ctx.request;
  const accountBookInfo = await service.patch(params, body);
  const res = response(200, accountBookInfo);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const updateStartday = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const { body } = ctx.request;
  const accountBookInfo = await service.patchStartday(params, body);
  const res = response(200, accountBookInfo);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const deleteResult = await service.del(params);
  const res = response(200, deleteResult);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

export default { get, getDetail, getCode, getTransaction, post, update, updateStartday, del };
