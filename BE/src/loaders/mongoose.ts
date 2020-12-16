import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import config from '@/config';

export default async (): Promise<void> => {
  await mongoose.connect(
    config.databaseURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (error: MongoError) => {
      if (error) {
        console.log('Failed to connect to Mongo server');
        console.error(error);
        throw error;
      } else {
        console.log(`connected to DB ${config.databaseURL}✅`);
      }
    },
  );
};
