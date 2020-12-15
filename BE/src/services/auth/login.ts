import { Context } from 'koa';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '@/interfaces/auth';

import redisService from '@/services/redis';
import { getAccessToken, getUserInfo } from '@services/auth/oauth';
import authCheckService from '@services/auth/check';

import userModel from '@models/user';

const SEC = 1;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = WEEK * 4;

const makeToken = <T>(Info: T, expire: number): string => {
  const jwtKey = process.env.JWT_KEY || '';
  const exp = Math.floor(new Date().valueOf() / 1000) + expire;
  const jwtInfo = { ...Info, exp };
  const token = jwt.sign(jwtInfo, jwtKey);
  return token;
};

const slidingSession = <User>(Info: User): string => {
  const accessToken = makeToken<User>(Info, DAY);
  return accessToken;
};

const refresh = async (body: Context['body']): Promise<string> => {
  authCheckService.decodeToken(body.refreshToken);
  const blocked: boolean = await redisService.isBlocked(body.refreshToken);
  if (blocked) throw createError(401, { message: 'exhibit refreshToken' });
  const userInfo: User = await redisService.isValid(body.refreshToken);

  const accessToken = makeToken<User>(userInfo, MIN);
  return accessToken;
};

const login = async (body: Context['body']): Promise<any> => {
  try {
    const { code, social } = body;

    const githubAccessToken = await getAccessToken(code, social);
    const userInfo = await getUserInfo(githubAccessToken, social);
    const refreshInfo = { type: 'refresh' };
    const isUserInDB = !!(await userModel.get({ ...userInfo }));

    if (!isUserInDB) {
      await userModel.create(userInfo);
    }

    const accessToken = makeToken<User>(userInfo, DAY);
    const refreshToken = makeToken<{ type: string }>(refreshInfo, DAY);
    redisService.intoRefreshToken(refreshToken, userInfo);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    const errorResponse = createError(501, error);
    throw errorResponse;
  }
};

export default { login, refresh, slidingSession };
