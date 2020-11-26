import { Context } from 'koa';
import createError from 'http-errors';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

import userModel from '@/models/user';
import { create } from 'domain';
import { errorHandler } from '@/loaders/error';

interface iTokenGetParams {
  code: string;
  client_id: string;
  client_secret: string;
}

interface iUser {
  id: string;
  name: string;
}

const getGitubAccessToken = async (code: string) => {
  const tokenGetParams: iTokenGetParams = {
    code,
    client_id: process.env.GITHUB_CLIENT_ID || '',
    client_secret: process.env.GITHUB_CLIENT_SECRET || '',
  };
  const tokenGetUrl = 'https://github.com/login/oauth/access_token';
  const { data } = await axios.post(tokenGetUrl, null, {
    params: tokenGetParams,
  });

  const regArr = data.match(/access_token=(\w+)&/);

  if (!regArr) throw createError(401, 'code expired');

  return regArr[1];
};

const getGithubUserInfo = async (accessToken: string) => {
  const userInfoGetUrl = 'https://api.github.com/user';
  const { data } = await axios.get(userInfoGetUrl, {
    headers: {
      Authorization: `BEARER ${accessToken}`,
    },
  });
  const userInfo = { id: data.login, name: data.name };
  return userInfo;
};

const checkUserInDB = async (userInfo: { id: string }): Promise<boolean> => {
  const user = await userModel.get(userInfo);
  return !!user;
};

const makeToken = (userInfo: iUser): string => {
  const jwtKey = process.env.JWT_KEY || '';
  const jwtConfig = {
    expiresIn: '2day',
  };
  const token = jwt.sign(userInfo, jwtKey, jwtConfig);
  return token;
};

const login = async (body: Context['body']): Promise<string> => {
  try {
    const githubAccessToken = await getGitubAccessToken(body.code);
    const userInfo = await getGithubUserInfo(githubAccessToken);
    const isUserInDB = await checkUserInDB(userInfo);

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
