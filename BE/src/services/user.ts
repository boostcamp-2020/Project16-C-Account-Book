import { UserModel } from '@/models/user';

const get = async (id?: string): Promise<any> => {
  const users = await UserModel.find({ id });
  return users;
};

const post = async ({
  id,
  name,
  password,
}: {
  id: string;
  name: string;
  password: string;
}): Promise<string> => {
  const userData = new UserModel({ id, name, password });
  const user = await userData.save();
  return user.id;
};
export default { get, post };
