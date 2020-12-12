import { User } from '@interfaces/auth';
import { UserModel } from './schema';

const get = async ({
  userid,
  social,
}: {
  userid: string;
  social: string;
}): Promise<any> => {
  const user = await UserModel.findOne({ userid, social });
  return user;
};

const create = async ({
  userid,
  name,
  social,
  profile,
}: {
  userid: string;
  name: string;
  social: string;
  profile: string;
}): Promise<string> => {
  const userData = new UserModel({ userid, name, social, profile });
  const user = await userData.save();

  return user.id;
};

export default { get, create };
