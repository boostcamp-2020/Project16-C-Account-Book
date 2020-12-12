import { postFetch } from '../service/fetch';

const refresh = async () => {
  const serverUrl = process.env.SERVER_URL;
  const tokenGetUrl = `${serverUrl}/api/auth/refresh`;
  const refreshToken = window.localStorage.getItem('refreshToken');
  try {
    const token = await postFetch(tokenGetUrl, { refreshToken });
    console.log(token);
    window.localStorage.setItem('accessToken', token.newAccessToken);
  } catch (err) {
    console.error(err);
  }
};

export default refresh;
