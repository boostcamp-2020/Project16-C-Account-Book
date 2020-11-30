import { User, UserModel } from './schema';

const get = async ({
  id,
  password,
}: {
  id: string;
  password: string | undefined;
}): Promise<User | null> => {
  const user = await UserModel.findOne({ id, password });
  return user;
};

const create = async ({
  id,
  name,
  password,
}: {
  id: string;
  name: string;
  password: string | undefined;
}): Promise<string> => {
  const userData = new UserModel({ id, name, password });
  const user = await userData.save();

  return user.id;
};

export default { get, create };
