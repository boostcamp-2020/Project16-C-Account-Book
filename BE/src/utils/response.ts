import Response from '@/interfaces/response';

const response = <T>(status: number, data: T): Response => {
  return { status, data };
};

export default response;
