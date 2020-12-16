import { Context } from 'koa';

import service from '@/services/transaction';

import response from '@/utils/response';

const exportCSV = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const csv = await service.exportCSV(params);
  const res = response(200, { csv });
  ctx.status = 200;
  ctx.body = res;
  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const { body } = ctx.request;
  const transaction = await service.post(params, body);
  const res = response(200, { transaction });
  ctx.body = res;
  return ctx.body;
};

const downloadTemplateCSV = async (ctx: Context): Promise<Context['body']> => {
  const csv = await service.downloadTemplateCSV(ctx);
  const res = response(200, csv.message, csv.data);
  ctx.body = res;

  return ctx.body;
};

const importCSV = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const { body } = ctx.request;
  const csv = await service.importCSV(params, body);
  if (csv) {
    const res = response(200, { csv });
    ctx.status = res.status;
    ctx.body = res;
    return ctx.body;
  }
  ctx.throw(400);
};

const patch = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const { body } = ctx.request;
  const updateResult = await service.patch(params, body);
  const res = response(200, updateResult);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const delResult = await service.del(params);
  const res = response(200, delResult);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

export default { exportCSV, downloadTemplateCSV, post, importCSV, patch, del };
