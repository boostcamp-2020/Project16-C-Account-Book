import { postFetch } from '../service/fetch';

const OK = 200;

const refresh = async (): Promise<any> => {
  const refreshToken = window.localStorage.getItem('refreshtoken');
  const response = await postFetch(
    `${process.env.SERVER_URL}/api/auth/refresh`,
    { refreshToken },
  );
  if (response) {
    window.localStorage.setItem('accesstoken', response.token);
    return true;
  }
  window.localStorage.removeItem('accesstoken');
  window.localStorage.removeItem('refreshtoken');
};

export default refresh;
