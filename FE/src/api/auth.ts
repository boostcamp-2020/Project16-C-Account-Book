import React from 'react';
import jwtDecode from 'jwt-decode';

import { postFetch } from '../service/fetch';

const login = async (code: string) => {
  const tokenGetUrl = 'http://localhost:3000/api/auth/login';
  try {
    const { token } = await postFetch(tokenGetUrl, { code });
    window.localStorage.setItem('token', token);
    console.log(jwtDecode(token));
  } catch (error) {
    console.error(error);
  }
};

export default { login };
