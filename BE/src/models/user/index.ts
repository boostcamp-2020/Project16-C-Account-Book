import { User, UserModel } from './schema';

const get = async ({ id }: { id: string }): Promise<User | null> => {
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

  return user.id;
};

export default { get, create };
