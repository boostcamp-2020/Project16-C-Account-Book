import mongooseLoader from './mongoose';
import koaLoader from './koa';

export default async (koaApp: any): Promise<void> => {
  await mongooseLoader();
  await koaLoader(koaApp);
  console.log(`Koa Initialized ✅`);
};
