import accountBookMethodModel from '@models/accountbook';
import { Context } from 'koa';

const get = async (): Promise<any> => {
  const accountBookMethods = await accountBookMethodModel.get();

  return accountBookMethods;
};

const post = async (body: Context['body']): Promise<any> => {
  await accountBookMethodModel.create(body.name, body.description, body.userId);
};

export default { get, post };
