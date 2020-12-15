import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const { Parser } = require('json2csv');

const post = async (params: any, body: any): Promise<any> => {
  const transactionInfo = {
    content: body.content,
    type: body.type,
    category: body.category,
    cost: body.cost,
    date: body.date,
    payment: body.payment,
  };
  const transaction = await accountBookModel.addTransaction(params.accountbookid, transactionInfo);
  if (transaction) {
    return transaction;
  }
  return {};
};

const patch = async (params: any, body: any): Promise<any> => {
  const accountBookId = params.accountbookid;
  const transactionId = params.transactionid;
  const updateInfo = {
    _id: transactionId,
    content: body.content,
    type: body.type,
    category: body.category,
    cost: body.cost,
    date: body.date,
    payment: body.payment,
  };
  const updateResult = await accountBookModel.updateTransaction(accountBookId, transactionId, updateInfo);
  return !!updateResult;
};

const del = async (params: any): Promise<any> => {
  const accountBookId = params.accountbookid;
  const transactionId = params.transactionid;
  const delResult = await accountBookModel.deleteTransaction(accountBookId, transactionId);
  return !!delResult;
};

const exportCSV = async (params: any): Promise<any> => {
  const accountBook = await accountBookModel.getDetail(params.accountbookid);
  const { transactions } = accountBook;
  console.log(transactions);

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
    return csv;
  }
  return {};
};

const importCSV = async (params: any, body: any): Promise<any> => {
  const csvArray = body;

  const failMessage = { message: 'csv 형식이 올바르지 않습니다.', data: {} };
  const fields = {
    content: 1,
    type: 1,
    cost: 1,
    date: 1,
    category: 1,
    payment: 1,
  };
  const transactionArray = [];

  for (let index = 1; index < csvArray.length; index += 1) {
    const tempTransaction: any = { category: {}, payment: {} };

    for (let i = 0; i < csvArray[0].length; i += 1) {
      const splitArray = csvArray[0][i].split('.');

      if (splitArray.length === 1) {
        if (!(csvArray[0][i] in fields)) return failMessage;

        tempTransaction[csvArray[0][i]] = csvArray[index][i];
      } else if (splitArray.length === 2) {
        if (!(splitArray[0] in fields)) return failMessage;

        tempTransaction[splitArray[0]][splitArray[1]] = csvArray[index][i];
      }
    }
    transactionArray.push(tempTransaction);
  }

  const result = await accountBookModel.addTransactions(params.accountbookid, transactionArray);

  return !!result;
};

export default { post, patch, del, exportCSV, importCSV };
