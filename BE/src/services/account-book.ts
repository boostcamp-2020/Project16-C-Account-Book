import accountBookMethodModel from '@/models/account-book';

const get = async (): Promise<any> => {
  const accountBookMethods = await accountBookMethodModel.getAllAccountBookMethods();

  return accountBookMethods;
};

const post = async (ctx: any): Promise<any> => {
  const accountBookMethods = await accountBookMethodModel.createAccountBookMethods(
    ctx,
  );

  return accountBookMethods;
};

export default { get, post };
