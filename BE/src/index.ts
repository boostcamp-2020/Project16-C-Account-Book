import 'module-alias/register';
import Koa from 'koa';
import dotenv from 'dotenv';
import path from 'path';
import loaders from './loaders';
// startServer();
dotenv.config({ path: path.join(__dirname, '../.env') });

const startServer = async () => {
  const app = new Koa();
  await loaders(app);

  app.listen(process.env.PORT);
  console.info(`http://localhost:${process.env.PORT} ✅`);
};

startServer();
