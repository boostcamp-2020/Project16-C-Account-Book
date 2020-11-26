import React from 'react';
import jwtDecode from 'jwt-decode';

import { postFetch } from '../service/fetch';

const login = async (code: string) => {
  const serverUrl = process.env.SERVER_URL;
  const tokenGetUrl = `${serverUrl}/api/auth/login`;
  try {
    const { token } = await postFetch(tokenGetUrl, { code });
    window.localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error(error);
  }
};

export default { login };
