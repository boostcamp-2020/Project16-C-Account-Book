import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const { Parser } = require('json2csv');

const post = async (ctx: Context): Promise<any> => {
  const transactionInfo = {
    content: ctx.request.body.content,
    type: ctx.request.body.type,
    category: ctx.request.body.category,
    cost: ctx.request.body.cost,
    date: ctx.request.body.date,
    payment: ctx.request.body.payment,
  };
  const transaction = await accountBookModel.addTransaction(
    ctx.params.accountbookid,
    transactionInfo,
  );
  if (transaction) {
    return {
      message: 'success',
      data: transaction,
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const patch = async (ctx: Context): Promise<any> => {
  const accountBookId = ctx.params.accountbookid;
  const transactionId = ctx.params.transactionid;
  const updateInfo = {
    _id: transactionId,
    content: ctx.request.body.content,
    type: ctx.request.body.type,
    category: ctx.request.body.category,
    cost: ctx.request.body.cost,
    date: ctx.request.body.date,
    payment: ctx.request.body.payment,
  };
  const updateResult = await accountBookModel.updateTransaction(
    accountBookId,
    transactionId,
    updateInfo,
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
  const accountBookId = ctx.params.accountbookid;
  const transactionId = ctx.params.transactionid;
  const delResult = await accountBookModel.deleteTransaction(
    accountBookId,
    transactionId,
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

const exportCSV = async (ctx: Context): Promise<any> => {
  const accountBook = await accountBookModel.getDetail(
    ctx.params.accountbookid,
  );
  const { transactions } = accountBook;

  if (transactions) {
    const fields = [
      'content',
      'type',
      'cost',
      'date',
      'category.name',
      'category.icon',
      'category.type',
      'payment.name',
      'payment.color',
      'payment.desc',
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactions);
    return {
      message: 'success',
      data: csv,
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const importCSV = async (ctx: Context): Promise<any> => {
  const isValidForm = (tempTransaction: any) => {
    const requirementsFields = ['content', 'type', 'cost', 'date'];
    for (const field of requirementsFields) {
      if (tempTransaction[field] === '') return false;
    }

    return true;
  };

  const makeTransactionArray = (csvArray: any) => {
    const fields = {
      content: 1,
      type: 1,
      cost: 1,
      date: 1,
      category: 1,
      payment: 1,
    };
    const transactionArray = [];

    for (let index = 1; index < csvArray.length; index++) {
      const tempTransaction: any = {
        category: { name: '미분류', icon: 1 },
        payment: { color: 'hsl(177deg 62% 40%)', desc: '' },
      };

      for (let i = 0; i < csvArray[0].length; i++) {
        const splitedCSV = csvArray[0][i].split('.');

        if (splitedCSV.length === 1) {
          if (!(csvArray[0][i] in fields)) return false;
          tempTransaction[csvArray[0][i]] = csvArray[index][i];
        } else if (splitedCSV.length === 2) {
          tempTransaction[splitedCSV[0]][splitedCSV[1]] = csvArray[index][i];
        }
      }

      if (!isValidForm(tempTransaction)) return false;
      transactionArray.push(tempTransaction);
    }

    return transactionArray;
  };

  const csvDatas = ctx.request.body;
  const transactionArray = makeTransactionArray(csvDatas);

  if (transactionArray === false) {
    return { message: 'csv 형식이 올바르지 않습니다.', data: {} };
  }

  const result = await accountBookModel.addTransactions(
    ctx.params.accountbookid,
    transactionArray,
  );

  if (result) {
    return {
      message: 'success',
    };
  }
  return {
    message: 'fail',
  };
};

export default { post, patch, del, exportCSV, importCSV };
