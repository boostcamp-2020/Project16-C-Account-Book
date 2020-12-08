import React from 'react';

import { postFetch } from '../service/fetch';

const login = async (code: string, social: string) => {
  const serverUrl = process.env.SERVER_URL;
  const tokenGetUrl = `${serverUrl}/api/auth/login`;

  try {
    const { access, refresh } = await postFetch(tokenGetUrl, { code, social });
    window.localStorage.setItem('accesstoken', access);
    window.localStorage.setItem('refreshtoken', refresh);
    return { access, refresh };
  } catch (error) {
    console.error(error);
  }
};

export default { login };
