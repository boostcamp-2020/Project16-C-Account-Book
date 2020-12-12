import { Context } from 'koa';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import userModel from '@models/user';
import { getAccessToken, getUserInfo } from '@services/auth/oauth';

const SEC = 1;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

const refreshTokens = new Map();

const makeToken = (Info: any, expire: any): string => {
  const jwtKey = process.env.JWT_KEY || '';
  const exp = Math.floor(new Date().valueOf() / 1000) + expire;
  const jwtInfo = { ...Info, exp };
  const token = jwt.sign(jwtInfo, jwtKey);
  return token;
};

const slidingSession = (Info: any): string => {
  const accessToken = makeToken(Info, MIN);
  return accessToken;
};

const refresh = (body: Context['body']): string => {
  const userInfo = refreshTokens.get(body.refreshToken);
  const accessToken = makeToken(userInfo, MIN);
  return accessToken;
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
    const refreshToken = makeToken(refreshInfo, DAY);
    refreshTokens.set(refreshToken, userInfo);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    const errorResponse = createError(501, error);
    throw errorResponse;
  }
};

export default { login, refresh, slidingSession };
