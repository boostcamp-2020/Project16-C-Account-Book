import createError from 'http-errors';
import { Context, Next } from 'koa';
import jwt, { Secret } from 'jsonwebtoken';

import userModel from '@models/user';
import { User } from '@interfaces/auth';

const parseTokenFromHeader = ({ authorization }: { authorization: string }) => {
  if (!authorization) {
    const authTypeError = createError(401, 'authorization header is not set');
    throw authTypeError;
  }

  const tokenReg = /Bearer ((\w|.)+)/;
  const matched = authorization.match(tokenReg);

  if (!matched || matched?.length < 2) {
    const authTypeError = createError(
      401,
      'authorization type needs to be BEARER',
    );
    throw authTypeError;
  }

  return matched[1];
};

const decodeToken = (token: string): User => {
  const jwtKey: Secret = process.env.JWT_KEY as Secret;
  try {
    const user: User = jwt.verify(token, jwtKey) as User;
    return user;
  } catch (error) {
    const jwtError = createError(401, error);
    throw jwtError;
  }
};

const checkToken = async (header: Context['header']): Promise<User | null> => {
  const token = parseTokenFromHeader(header);
  const user = decodeToken(token);
  const isUserInDB = !!(await userModel.get(user));
  return isUserInDB ? user : null;
};

export default { checkToken };
