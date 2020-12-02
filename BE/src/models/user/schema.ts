import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  name?: string;
  social: string;
}

export const Schema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, default: '' },
  social: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('users', Schema);
