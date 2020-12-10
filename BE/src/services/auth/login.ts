import { Context } from 'koa';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import userModel from '@models/user';
import { User } from '@interfaces/auth';
import { getAccessToken, getUserInfo } from '@services/auth/oauth';

const makeToken = (userInfo: User): string => {
  const jwtKey = process.env.JWT_KEY || '';

  const token = jwt.sign(userInfo, jwtKey);
  return token;
};

const login = async (body: Context['body']): Promise<string> => {
  try {
    const { code, social } = body;

    console.log('social login: ', social);

    const githubAccessToken = await getAccessToken(code, social);
    const userInfo = await getUserInfo(githubAccessToken, social);
    const isUserInDB = !!(await userModel.get(userInfo));

    if (!isUserInDB) {
      await userModel.create(userInfo);
    }

    const token = makeToken(userInfo);

    return token;
  } catch (error) {
    console.error(error);
    const errorResponse = createError(501, error);
    throw errorResponse;
  }
};

export default { login };
