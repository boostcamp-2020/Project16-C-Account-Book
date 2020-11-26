import mongoose from 'mongoose';

export interface iUser extends mongoose.Document {
  id: string;
  name: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

userSchema.index({ id: 1 });

const UserModel = mongoose.model<iUser>('users', userSchema);

const get = async ({ id }: { id: string }): Promise<iUser | null> => {
  const user = await UserModel.findOne({ id });
  return user;
};

const create = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<string> => {
  const userData = new UserModel({ id, name });
  const user = await userData.save();

  console.log(`create user ${id}`);

  return user.id;
};

export default { get, create };
