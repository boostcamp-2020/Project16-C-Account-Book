import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const URL = process.env.DATABASE_URL || `mongodb://localhost:27017/test`;

export default async (): Promise<void> => {
  await mongoose.connect(
    URL,
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
        console.log('connected to DB ✅');
      }
    },
  );
};
