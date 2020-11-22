import 'module-alias/register';
import Koa from 'koa';
import loaders from './loaders';
// startServer();

const startServer = async () => {
  const app = new Koa();
  await loaders(app);

  app.listen(process.env.PORT);
  console.info(`✅ http://localhost:${process.env.PORT}`);
};

startServer();
