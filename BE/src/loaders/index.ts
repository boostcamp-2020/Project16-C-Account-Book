import Koa from 'koa';

import mongooseLoader from './mongoose';
import koaLoader from './koa';
import { redisLoader } from './redis';

export default async (
  koaApp: Koa<Koa.DefaultState, Koa.DefaultContext>,
): Promise<void> => {
  redisLoader();
  await mongooseLoader();
  koaLoader(koaApp);
  console.log(`Koa Initialized ✅`);
};
