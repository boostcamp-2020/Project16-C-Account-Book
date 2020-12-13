import 'module-alias/register';
import 'reflect-metadata';
import Koa from 'koa';
import dotenv from 'dotenv';
import path from 'path';
import loaders from './loaders';

dotenv.config({ path: path.join(__dirname, '../.env') });

const startServer = async (): Promise<void> => {
  const app = new Koa();
  await loaders(app);
  app.listen(process.env.PORT);
  console.info(`http://localhost:${process.env.PORT} ✅`);
};

startServer();
