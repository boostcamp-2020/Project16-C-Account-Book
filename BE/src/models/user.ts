import mongoose from 'mongoose';
import { iUser } from '@/types/auth';

export interface iUserDoc extends mongoose.Document {
  id: string;
  name: string;
  social: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  social: { type: String, required: true },
});

userSchema.index({ id: 1, social: 2 });

const UserModel = mongoose.model<iUserDoc>('users', userSchema);

const get = async ({ id, social }: iUser): Promise<iUserDoc | null> => {
  const user = await UserModel.findOne({ id, social });
  return user;
};

const create = async ({ id, name, social }: iUser): Promise<string> => {
  const userData = new UserModel({ id, name, social });
  const user = await userData.save();

  console.log(`create user ${id}`);

  return user.id;
};

export default { get, create };
