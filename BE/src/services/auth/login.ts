import { Context } from 'koa';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import userModel from '@models/user';
import { User } from '@interfaces/auth';
import { getAccessToken, getUserInfo } from '@services/auth/oauth';

const makeToken = (userInfo: any): string => {
  const jwtKey = process.env.JWT_KEY || '';

  const token = jwt.sign(userInfo, jwtKey);
  return token;
};

const login = async (body: Context['body']): Promise<any> => {
  try {
    const { code, social } = body;

    const githubAccessToken = await getAccessToken(code, social);
    const userInfo = await getUserInfo(githubAccessToken, social);
    const refreshInfo = { type: 'refresh' };
    const isUserInDB = !!(await userModel.get(userInfo));

    if (!isUserInDB) {
      await userModel.create(userInfo);
    }

    const accessToken = makeToken(userInfo);
    const refreshToken = makeToken(refreshInfo);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    const errorResponse = createError(501, error);
    throw errorResponse;
  }
};

export default { login };
