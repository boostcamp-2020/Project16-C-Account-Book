import { Context } from 'koa';
import service from '@services/transaction';
import { response } from '@utils/response';

const exportCSV = async (ctx: Context): Promise<Context['body']> => {
  const csv = await service.exportCSV(ctx);
  const res = response(200, csv.message, csv.data);
  ctx.body = res;

  return ctx.body;
};

const importCSV = async (ctx: Context): Promise<Context['body']> => {
  const result = await service.importCSV(ctx);
  const csv = result.data;
  console.log('!', csv);
  for (var token of csv) {
    console.log('나와');
  }
  const res = response(200, result.message, result.data);
  ctx.body = res;

  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const transaction = await service.post(ctx);
  const res = response(200, transaction.message, transaction.data);
  ctx.body = res;
  return ctx.body;
};

const patch = async (ctx: Context): Promise<Context['body']> => {
  const updateResult = await service.patch(ctx);
  const res = response(200, updateResult.message, updateResult.data);
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const delResult = await service.del(ctx);
  const res = response(200, delResult.messsage, delResult.data);
  ctx.body = res;
  return ctx.body;
};

export default { exportCSV, post, importCSV, patch, del };
