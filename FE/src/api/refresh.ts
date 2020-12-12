import { postFetch } from '../service/fetch';

const refresh = async () => {
  const serverUrl = process.env.SERVER_URL;
  const tokenGetUrl = `${serverUrl}/api/auth/refresh`;
  const refreshToken = window.localStorage.getItem('refreshToken');
  try {
    const response = await postFetch(tokenGetUrl, { refreshToken });
    window.localStorage.setItem('accessToken', response.newAccessToken);
    if (response.status === 401) {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
  }
};

export default refresh;
