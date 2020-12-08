import { Context } from 'koa';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import userModel from '@models/user';
import { User } from '@interfaces/auth';
import { getAccessToken, getUserInfo } from '@services/auth/oauth';

const SEC = 1;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

const makeToken = (userInfo: User, expTime: number): string => {
  const jwtKey = process.env.JWT_KEY || '';
  const tokenInfo = {
    ...userInfo,
    exp: Math.floor(Date.now() / 1000) + expTime,
  };
  const token = jwt.sign(tokenInfo, jwtKey);
  return token;
};

const login = async (body: Context['body']): Promise<any> => {
  try {
    const { code, social } = body;

    const githubAccessToken = await getAccessToken(code, social);
    const userInfo = await getUserInfo(githubAccessToken, social);
    const isUserInDB = !!(await userModel.get(userInfo));

    if (!isUserInDB) {
      await userModel.create(userInfo);
    }

    const accessToken = makeToken(userInfo, MIN);
    const refreshToken = makeToken(userInfo, DAY * 10);
    const tokens = {
      access: accessToken,
      refresh: refreshToken,
    };
    return tokens;
  } catch (error) {
    console.error(error);
    const errorResponse = createError(501, error);
    throw errorResponse;
  }
};

export default { login };
