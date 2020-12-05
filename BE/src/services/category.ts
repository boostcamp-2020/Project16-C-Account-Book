import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const post = async (ctx: Context): Promise<any> => {
  const categoryInfo = {
    name: ctx.request.body.name,
    icon: ctx.request.body.icon,
  };
  const category = await accountBookModel.addCategory(
    ctx.params.accountbookid,
    categoryInfo,
  );
  if (category) {
    return {
      message: 'success',
      data: category,
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const patch = async (ctx: Context): Promise<any> => {
  const categoryInfo = {
    _id: ctx.params.categoryid,
    name: ctx.request.body.name,
    icon: ctx.request.body.icon,
  };
  const updateResult = await accountBookModel.updateCategory(
    ctx.params.accountbookid,
    categoryInfo,
  );
  if (updateResult) {
    return {
      message: 'success',
      data: {},
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const del = async (ctx: Context): Promise<any> => {
  const delResult = await accountBookModel.deleteCategory(
    ctx.params.accountbookid,
    ctx.params.categoryid,
  );
  if (delResult) {
    return {
      message: 'success',
      data: {},
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

export default { post, patch, del };
