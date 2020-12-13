import Response from '@interfaces/response';

const response = <T>(
  status: number,
  message: string,
  accessToken: string,
  data: T,
): Response => {
  return { status, message, accessToken, data };
};

export default response;
