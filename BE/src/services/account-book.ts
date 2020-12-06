import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const get = async (ctx: Context): Promise<any> => {
  const accountBooks = await accountBookModel.get(ctx.user);
  return accountBooks;
};

const post = async (ctx: Context): Promise<any> => {
  const createInfo = {
    name: ctx.request.body.name,
    description: ctx.request.body.description,
    user: ctx.user,
  };
  const accountBook = await accountBookModel.create(createInfo);

  return accountBook;
};

const patch = async (ctx: Context): Promise<any> => {
  const { accountbookid } = ctx.params;
  const updateInfo = {
    name: ctx.request.body.name,
    description: ctx.request.body.description,
  };
  const updateResult = await accountBookModel.update(accountbookid, updateInfo);
  if (updateResult)
    return {
      message: 'update',
      data: {
        _id: accountbookid,
        name: updateInfo.name,
        description: updateInfo.description,
      },
    };
  return {
    message: 'not update',
    data: {},
  };
};

const del = async (ctx: Context): Promise<any> => {
  const deleteResult = await accountBookModel.del(ctx.params.accountbookid);
  return deleteResult;
};

const getDetail = async (ctx: Context): Promise<any> => {
  const accountBook = await accountBookModel.getDetail(
    ctx.params.accountbookid,
  );
  return accountBook;
};

export default { get, getDetail, post, patch, del };
