import { Context } from 'koa';
import createError from 'http-errors';
import jwt, { Secret } from 'jsonwebtoken';

import userModel from '@models/user';
import { getAccessToken, getUserInfo } from '@services/auth/oauth';

const SEC = 1;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

const refreshTokens = new Map();

const makeToken = (info: any, expTime: number): string => {
  const jwtKey = process.env.JWT_KEY || '';
  const tokenInfo = {
    ...info,
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
    const refreshInfo = {};
    const isUserInDB = !!(await userModel.get(userInfo));

    if (!isUserInDB) {
      await userModel.create(userInfo);
    }

    const accessToken = makeToken(userInfo, 10 * SEC);
    const refreshToken = makeToken(refreshInfo, DAY * 10);
    refreshTokens.set(refreshToken, userInfo);
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

const refresh = (body: Context['body']): any => {
  const { refreshToken } = body;

  try {
    const accessToken = makeToken(refreshTokens.get(refreshToken), MIN);
    return accessToken;
  } catch (error) {
    const jwtError = createError(401, error);
    throw jwtError;
  }
};

export default { login, refresh };
