import React from 'react';

import { postFetch } from '../service/fetch';

const login = async (code: string, social: string) => {
  const serverUrl = process.env.SERVER_URL;
  const tokenGetUrl = `${serverUrl}/api/auth/login`;
  try {
    const { token } = await postFetch(tokenGetUrl, { code, social });
    window.localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error(error);
  }
};

export default { login };
