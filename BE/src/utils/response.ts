import Response from '@interfaces/response';

const response = <T>(
  status: number,
  accessToken: string,
  data: T,
): Response => {
  return { status, accessToken, data };
};

export default response;
