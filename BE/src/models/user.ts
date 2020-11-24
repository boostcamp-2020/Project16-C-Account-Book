import mongoose from 'mongoose';

export interface iUser extends mongoose.Document {
  id: string;
  name: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<iUser>('users', userSchema);
