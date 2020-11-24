import { Context } from 'koa';
import service from '@/services/defaultPaymentMethod';

const get = async (ctx: Context): Promise<Context['body']> => {
  const defaultPaymentMethod = await service.get();
  ctx.body = defaultPaymentMethod;

  return ctx.body;
};

export default { get };
