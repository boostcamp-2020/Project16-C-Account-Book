interface ResponseError extends Error {
  status?: number;
}

export default ResponseError;
