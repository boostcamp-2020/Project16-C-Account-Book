import Response from '@interfaces/response';

export const response = (
  status: number,
  message: string,
  data?: any,
): Response => {
  return { status, message, data };
};
