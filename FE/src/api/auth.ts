import React from 'react';
import jwtDecode from 'jwt-decode';

import { postFetch } from '../service/fetch';

const login = async (code: string) => {
  const backendPath = process.env.BACKEND;
  const tokenGetUrl = `${backendPath}/api/auth/login`;
  try {
    const { token } = await postFetch(tokenGetUrl, { code });
    window.localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error(error);
  }
};

export default { login };
