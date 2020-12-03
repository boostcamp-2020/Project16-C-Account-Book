import Response from '@interfaces/response';

export const response = (
  status: number,
  message: string,
  data: JSON,
): Response => {
  return { status, message, data };
};
