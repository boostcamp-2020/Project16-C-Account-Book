import mongoose from 'mongoose';

export interface accountBookMethod extends mongoose.Document {
  name: string;
  description: string;
  transaction: [];
}

const accountBookMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  transaction: { type: Object, required: false },
});

const accountBookMethodModel = mongoose.model<accountBookMethod>(
  'account_book_methods',
  accountBookMethodSchema,
);

const getAllAccountBookMethods = () => {
  try {
    return accountBookMethodModel.find();
  } catch (error) {
    return { statusCode: 500 };
  }
};

export default { getAllAccountBookMethods };
