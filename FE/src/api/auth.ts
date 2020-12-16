import { postFetch } from '../service/fetch';

const login = async (code: string, social: string): Promise<void> => {
  const serverUrl = process.env.SERVER_URL;
  const tokenGetUrl = `${serverUrl}/api/auth/login`;
  try {
    const token = await postFetch(tokenGetUrl, { code, social });
    window.localStorage.setItem('accessToken', token.accessToken);
    window.localStorage.setItem('refreshToken', token.refreshToken);
  } catch (error) {
    console.error(error);
  }
};

export default { login };
