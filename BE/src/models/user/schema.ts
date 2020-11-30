import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  name: string;
  password: string;
}

const Schema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String },
});

export const UserModel = mongoose.model<User>('users', Schema);
