import mongoose from 'mongoose';
import { User } from '@interfaces/auth';

export interface UserDoc extends User, mongoose.Document {}

export const Schema = new mongoose.Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true, default: '' },
  profile: { type: String, required: true },
  social: { type: String, required: true },
});

Schema.index({ userid: 1, social: 1 });

export const UserModel = mongoose.model<UserDoc>('users', Schema);
