import Koa from 'koa';

import mongooseLoader from '@/loaders/mongoose';
import koaLoader from '@/loaders/koa';
import { redisLoader } from '@/loaders/redis';

export default async (
  koaApp: Koa<Koa.DefaultState, Koa.DefaultContext>,
): Promise<void> => {
  redisLoader();
  await mongooseLoader();
  koaLoader(koaApp);
  console.log(`Koa Initialized ✅`);
};
