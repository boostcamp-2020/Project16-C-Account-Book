import { postFetch } from '../service/fetch';

const refresh = async () => {
  const serverUrl = process.env.SERVER_URL;
  const tokenGetUrl = `${serverUrl}/api/auth/refresh`;
  window.localStorage.removeItem('accessToken');
  const refreshToken = window.localStorage.getItem('refreshToken');

  const response = await postFetch(tokenGetUrl, { refreshToken });
  window.localStorage.setItem('accessToken', response.data);
  if (response.status !== 200) {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    return false;
  }
  return true;
};

export default refresh;
