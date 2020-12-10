import accountBookModel from '@models/accountbook';
import { Context } from 'koa';
import Random from '@utils/random';

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

const patchStartday = async (ctx: Context): Promise<any> => {
  const { accountbookid } = ctx.params;
  const updateInfo = {
    startday: ctx.request.body.startday,
  };
  const updateResult = await accountBookModel.updateStartday(
    accountbookid,
    updateInfo,
  );
  if (updateResult)
    return {
      message: 'update',
      data: {
        _id: accountbookid,
        startday: updateInfo.startday,
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

const getCode = async (ctx: Context): Promise<any> => {
  const id = ctx.params.accountbookid;
  const code = Random.randomStr(10);
  const updateResult = await accountBookModel.updateCode(id, code);
  if (updateResult) return updateResult;
  return false;
};

const addUser = async (ctx: Context): Promise<any> => {
  const { code } = ctx.request.body;
  const userInfo = ctx.user;
  const updateResult = await accountBookModel.addUser(code, userInfo);
  if (updateResult) return true;
  return false;
};

const delUser = async (ctx: Context): Promise<any> => {
  const accountBookId = ctx.params.accountbookid;
  const userInfo = ctx.user;
  const updateResult = await accountBookModel.delUser(accountBookId, userInfo);
  if (updateResult) return true;
  return false;
};

export default {
  get,
  getDetail,
  post,
  patch,
  patchStartday,
  del,
  getCode,
  addUser,
  delUser,
};
