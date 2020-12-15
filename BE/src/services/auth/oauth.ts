import createError from 'http-errors';
import axios from 'axios';

import { iTokenGetParams } from '@interfaces/auth';

const tokenGetParams: { [key: string]: iTokenGetParams } = {
  github: {
    client_id: process.env.GITHUB_CLIENT_ID || '',
    client_secret: process.env.GITHUB_CLIENT_SECRET || '',
  },
  naver: {
    client_id: process.env.NAVER_CLIENT_ID || '',
    client_secret: process.env.NAVER_CLIENT_SECRET || '',
    grant_type: 'authorization_code',
  },
};

const tokenGetUrl: { [key: string]: string } = {
  github: 'https://github.com/login/oauth/access_token',
  naver: 'https://nid.naver.com/oauth2.0/token',
};

const accessTokenReg: { [key: string]: RegExp } = {
  github: /access_token=(\w+)&/,
  naver: /access_token=(\w+)&/,
};

const userInfoGetUrl: { [key: string]: string } = {
  github: 'https://api.github.com/user',
  naver: 'https://openapi.naver.com/v1/nid/me',
};

const getTokenFromRes = (data: any, social: string): string => {
  try {
    if (social === 'github') {
      const regArr = data.match(accessTokenReg[social]);
      return regArr[1];
    }
    if (social === 'naver') {
      return data.access_token;
    }
    throw createError(401, `${social} login is not supported`);
  } catch (error) {
    throw createError(401, 'code expired');
  }
};

export const getAccessToken = async (code: string, social: string): Promise<string> => {
  const { data } = await axios.post(tokenGetUrl[social], null, {
    params: {
      ...tokenGetParams[social],
      code,
    },
  });

  const token = getTokenFromRes(data, social);

  return token;
};

export const getUserInfo = async (accessToken: string, social: string): Promise<any> => {
  const { data } = await axios.get(userInfoGetUrl[social], {
    headers: {
      Authorization: `BEARER ${accessToken}`,
    },
  });

  if (social === 'github') {
    const userInfo = {
      userid: data.login,
      name: data.name || '',
      profile: data.avatar_url,
      social,
    };
    return userInfo;
  }
  if (social === 'naver') {
    const userInfo = {
      userid: data.response.email,
      name: data.response.name || '',
      profile: data.response.profile_image,
      social,
    };

    return userInfo;
  }
  throw createError(401, `${social} login is not supported`);
};
