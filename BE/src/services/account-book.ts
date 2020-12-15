import accountBookModel from '@models/accountbook';
import { Context } from 'koa';
import Random from '@utils/random';

const get = async (userInfo: any): Promise<any> => {
  const accountBooks = await accountBookModel.get(userInfo);
  return accountBooks;
};

const post = async (userInfo: any, body: Context['body']): Promise<any> => {
  const createInfo = {
    name: body.name,
    description: body.description,
    user: userInfo,
  };
  const accountBook = await accountBookModel.create(createInfo);

  return accountBook;
};

const patch = async (params: any, body: any): Promise<any> => {
  const { accountbookid } = params;
  const updateInfo = {
    name: body.name,
    description: body.description,
  };
  const updateResult = await accountBookModel.update(accountbookid, updateInfo);
  if (updateResult)
    return {
      _id: accountbookid,
      name: updateInfo.name,
      description: updateInfo.description,
    };
  return {};
};

const patchStartday = async (params: any, body: any): Promise<any> => {
  const { accountbookid } = params;
  const updateInfo = {
    startday: body.startday,
  };
  const updateResult = await accountBookModel.updateStartday(accountbookid, updateInfo);
  if (updateResult)
    return {
      _id: accountbookid,
      startday: updateInfo.startday,
    };
  return {};
};

const del = async (params: any): Promise<any> => {
  const deleteResult = await accountBookModel.del(params.accountbookid);
  return deleteResult;
};

const getDetail = async (params: any): Promise<any> => {
  const { accountbookid } = params;
  const accountBook = await accountBookModel.getDetail(accountbookid);
  return accountBook;
};

const getTransaction = async (params: any): Promise<any> => {
  const { accountbookid } = params;
  const accountBook = await accountBookModel.getTransactions(accountbookid, params.year, params.month);
  return accountBook;
};

const getCode = async (params: any): Promise<any> => {
  const accountBookId = params.accountbookid;
  const code = Random.randomStr(10);
  const updateResult = await accountBookModel.updateCode(accountBookId, code);
  return updateResult ? code : false;
};

const addUser = async (codeInfo: any, userInfo: any): Promise<boolean> => {
  const { code } = codeInfo;
  const updateResult = await accountBookModel.addUser(code, userInfo);
  if (updateResult) return updateResult;
  return false;
};

const delUser = async (paramInfo: any, userInfo: any): Promise<boolean> => {
  const accountBookId = paramInfo.accountbookid;
  const updateResult = await accountBookModel.delUser(accountBookId, userInfo);
  if (updateResult) return true;
  return false;
};

export default {
  get,
  getDetail,
  getTransaction,
  post,
  patch,
  patchStartday,
  del,
  getCode,
  addUser,
  delUser,
};
