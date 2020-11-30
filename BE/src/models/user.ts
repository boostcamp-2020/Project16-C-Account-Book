import mongoose from 'mongoose';
import { iUser } from '@/types/auth';

export interface iUserDoc extends mongoose.Document {
  id: string;
  name: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
});

userSchema.index({ id: 1 });

const UserModel = mongoose.model<iUserDoc>('users', userSchema);

const get = async ({ id }: iUser): Promise<iUserDoc | null> => {
  const user = await UserModel.findOne({ id });
  return user;
};

const create = async ({ id, name }: iUser): Promise<string> => {
  const userData = new UserModel({ id, name });
  const user = await userData.save();

  console.log(`create user ${id}`);

  return user.id;
};

export default { get, create };
