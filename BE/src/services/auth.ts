import { Context, Next } from 'koa';
import createError from 'http-errors';
import axios from 'axios';
import jwt, { Secret } from 'jsonwebtoken';

import userModel from '@/models/user';
import { iTokenGetParams, iUser } from '@/types/auth';

const accessToken = async (
  code: string,
  tokenGetUrl: string,
  tokenGetParams: iTokenGetParams,
  reg: RegExp,
) => {
  const { data } = await axios.post(tokenGetUrl, null, {
    params: tokenGetParams,
  });

  const regArr = data.match(reg);

  if (!regArr) throw createError(401, 'code expired');

  return regArr[1];
};

const getGitubAccessToken = async (code: string) => {
  const tokenGetParams: iTokenGetParams = {
    code,
    client_id: process.env.GITHUB_CLIENT_ID || '',
    client_secret: process.env.GITHUB_CLIENT_SECRET || '',
  };
  const tokenGetUrl = 'https://github.com/login/oauth/access_token';
  const reg = /access_token=(\w+)&/;

  const token = await accessToken(code, tokenGetUrl, tokenGetParams, reg);
  return token;
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

const checkUserInDB = async (userInfo: iUser): Promise<boolean> => {
  const user = await userModel.get(userInfo);
  return !!user;
};

const makeToken = (userInfo: iUser): string => {
  const jwtKey = process.env.JWT_KEY || '';

  const token = jwt.sign(userInfo, jwtKey);
  return token;
};

const login = async (body: Context['body']): Promise<string> => {
  try {
    const { social, code } = body;
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

const parseTokenFromHeader = ({ authorization }: { authorization: string }) => {
  if (!authorization) {
    const authTypeError = createError(401, 'authorization header is not set');
    throw authTypeError;
  }

  const tokenReg = /Bearer ((\w|.)+)/;
  const matched = authorization.match(tokenReg);

  if (!matched || matched?.length < 2) {
    const authTypeError = createError(
      401,
      'authorization type needs to be BEARER',
    );
    throw authTypeError;
  }

  return matched[1];
};

const decodeToken = (token: string): iUser => {
  const jwtKey: Secret = process.env.JWT_KEY as Secret;
  try {
    const user: iUser = jwt.verify(token, jwtKey) as iUser;
    return user;
  } catch (error) {
    const jwtError = createError(401, 'jwt malformed');
    throw jwtError;
  }
};

const checkToken = async (header: Context['header']): Promise<boolean> => {
  const token = parseTokenFromHeader(header);
  console.log('token: ', token);

  const user = decodeToken(token);
  const isUserInDB = await checkUserInDB(user);
  return isUserInDB;
};

export default { login, checkToken };
