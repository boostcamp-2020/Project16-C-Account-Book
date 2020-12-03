import { User, UserModel } from './schema';

const get = async ({
  id,
  social,
}: {
  id: string;
  social: string;
}): Promise<User | null> => {
  const user = await UserModel.findOne({ id, social });
  return user;
};

const create = async ({
  id,
  name,
  social,
}: {
  id: string;
  name?: string;
  social: string;
}): Promise<string> => {
  const userData = new UserModel({ id, name, social });
  const user = await userData.save();

  return user.id;
};

export default { get, create };
