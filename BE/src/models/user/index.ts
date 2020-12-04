import { User } from '@interfaces/auth';
import { UserModel } from './schema';

const get = async ({
  userid,
  social,
}: {
  userid: string;
  social: string;
}): Promise<User | null> => {
  const user = await UserModel.findOne({ userid, social });
  return user;
};

const create = async ({
  userid,
  name,
  social,
}: {
  userid: string;
  name?: string;
  social: string;
}): Promise<string> => {
  const userData = new UserModel({ userid, name, social });
  const user = await userData.save();

  return user.id;
};

export default { get, create };
