import 'module-alias/register';
import 'reflect-metadata';
import Koa from 'koa';
import config from '@/config';
import loaders from '@/loaders';

const startServer = async (): Promise<void> => {
  const app = new Koa();
  await loaders(app);
  app.listen(config.port, () => {
    console.info(`http://localhost:${config.port} ✅`);
  });
};

startServer();
