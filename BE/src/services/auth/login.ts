import { Context } from 'koa';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import userModel from '@models/user';
import { getAccessToken, getUserInfo } from '@services/auth/oauth';

const SEC = 1;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

const makeToken = (userInfo: any, exp: any): string => {
  const jwtKey = process.env.JWT_KEY || '';
  const jwtInfo = { ...userInfo, exp };
  const token = jwt.sign(jwtInfo, jwtKey);
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

    const accessToken = makeToken(userInfo, MIN);
    const refreshToken = makeToken(refreshInfo, 10 * MIN);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    const errorResponse = createError(501, error);
    throw errorResponse;
  }
};

export default { login };
