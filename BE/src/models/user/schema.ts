import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  name: string;
}

export const Schema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('users', Schema);
