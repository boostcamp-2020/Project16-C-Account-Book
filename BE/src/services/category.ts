import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const post = async (params: any, body: any): Promise<any> => {
  const categoryInfo = {
    name: body.name,
    type: body.type,
    icon: body.icon,
  };
  const category = await accountBookModel.addCategory(params.accountbookid, categoryInfo);
  if (category) return category;
  return {};
};

const patch = async (params: any, body: any): Promise<any> => {
  const categoryInfo = {
    _id: params.categoryid,
    name: body.name,
    type: body.type,
    icon: body.icon,
  };
  const updateResult = await accountBookModel.updateCategory(params.accountbookid, categoryInfo);
  return !!updateResult;
};

const del = async (params: any): Promise<any> => {
  const delResult = await accountBookModel.deleteCategory(params.accountbookid, params.categoryid);
  return !!delResult;
};

export default { post, patch, del };
