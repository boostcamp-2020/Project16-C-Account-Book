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
        ('Failed to connect to Mongo server');
        console.error(error);
        throw error;
      } else {
        `connected to DB ${config.databaseURL}✅`;
      }
    },
  );
};
