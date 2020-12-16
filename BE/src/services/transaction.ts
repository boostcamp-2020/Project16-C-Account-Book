import accountBookModel from '@models/accountbook';
import transactionModel from '@/models/transaction';

const { Parser } = require('json2csv');

const post = async (params: any, body: any): Promise<any> => {
  const transactionInfo = {
    content: body.content,
    type: body.type,
    category: body.category,
    cost: body.cost,
    date: body.date,
    payment: body.payment,
    accountbook: params.accountbookid,
  };
  const transaction = await transactionModel.post(transactionInfo);
  if (transaction) {
    return transaction;
  }
  return {};
};

const patch = async (params: any, body: any): Promise<any> => {
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
  const updateResult = await transactionModel.patch(transactionId, updateInfo);
  return !!updateResult;
};

const del = async (params: any): Promise<any> => {
  const transactionId = params.transactionid;
  const delResult = await transactionModel.del(transactionId);
  return !!delResult;
};

const exportCSV = async (params: any): Promise<any> => {
  const accountBook = await accountBookModel.getDetail(params.accountbookid);
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
    return csv;
  }
  return {};
};

const downloadTemplateCSV = async (ctx: Context): Promise<any> => {
  const exampleTransaction = [
    {
      content: '버거킹',
      type: '지출',
      cost: 20000,
      date: '2020-12-15',
      category: { name: '식비', type: '지출' },
      payment: { name: 'BC Card', desc: '체크 카드' },
    },
  ];

  const fields = ['content', 'type', 'cost', 'date', 'category.name', 'category.type', 'payment.name', 'payment.desc'];

  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(exampleTransaction);
  return {
    message: 'success',
    data: csv,
  };
};

const importCSV = async (params: any, body: any): Promise<any> => {
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

    for (let index = 1; index < csvArray.length; index += 1) {
      const tempTransaction: any = {
        category: { name: '미분류', icon: 1 },
        payment: { color: 'hsl(177deg 62% 40%)', desc: '' },
        accountbook: params.accountbookid,
      };

      for (let i = 0; i < csvArray[0].length; i += 1) {
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

  const csvDatas = body;
  const transactionArray = makeTransactionArray(csvDatas);

  if (transactionArray === false) {
    return { message: 'csv 형식이 올바르지 않습니다.', data: {} };
  }

  const result = await transactionModel.postMany(transactionArray);

  return !!result;
};

export default { post, patch, del, exportCSV, downloadTemplateCSV, importCSV };
