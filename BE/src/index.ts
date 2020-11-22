import Koa from 'koa';
import 'module-alias/register';

import init from '@/loaders/koa-loader';

const app = new Koa();

const startApp = async () => {
  await init(app);
  app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  });
};

startApp();
