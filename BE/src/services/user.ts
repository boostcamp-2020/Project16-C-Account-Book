import userModel from '@models/user';
import { Context } from 'koa';

const get = async (body: Context['body']): Promise<any> => {
  const users = await userModel.get(body);
  return users;
};

const post = async (body: Context['body']): Promise<string> => {
  const userId = await userModel.create(body);
  return userId;
};

export default { get, post };
