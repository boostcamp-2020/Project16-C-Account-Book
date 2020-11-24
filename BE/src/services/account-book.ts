import accountBookMethodModel from '@/models/account-book';

const get = async (): Promise<any> => {
  const accountBookMethods = await accountBookMethodModel.getAllAccountBookMethods();

  return accountBookMethods;
};

export default { get };
