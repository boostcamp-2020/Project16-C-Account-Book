import { redisDB } from '@loaders/redis';
import { tempUser, User } from '@interfaces/auth';

import { promisify } from 'util';

const getAccessInfo = promisify(redisDB.hgetall).bind(redisDB);
const getBlockInfo = promisify(redisDB.get).bind(redisDB);

const enum DB_NAME {
  REFRESH,
  BLACKLIST,
}
const refresh = DB_NAME.REFRESH;
const blacklist = DB_NAME.BLACKLIST;

const intoBlackList = (refreshToken: string): boolean => {
  redisDB.select(blacklist);
  return redisDB.set(refreshToken, 'true');
};

const intoRefreshToken = (refreshToken: string, userData: User): boolean => {
  redisDB.select(refresh);
  return redisDB.hmset(
    refreshToken,
    'userid',
    userData.userid,
    'name',
    userData.name,
    'profile',
    userData.profile,
    'social',
    userData.social,
  );
};

const isBlocked = async (refreshToken: string): Promise<boolean> => {
  redisDB.select(blacklist);
  const blocked = await getBlockInfo(refreshToken);
  return !!blocked;
};

const isValid = async (refreshToken: string): Promise<User> => {
  redisDB.select(refresh);
  const accessInfo = await getAccessInfo(refreshToken);
  const keys = Object.keys(accessInfo);
  const userInfo: tempUser = {
    userid: '',
    social: '',
    profile: '',
    name: '',
  };
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    userInfo[k] = accessInfo[k];
  }

  const user: User = userInfo;
  return user;
};

export default { intoBlackList, intoRefreshToken, isBlocked, isValid };
