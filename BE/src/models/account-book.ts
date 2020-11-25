import mongoose from 'mongoose';

interface accountBookMethod extends mongoose.Document {
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

const createAccountBookMethods = ({
  name,
  description,
  transaction,
}: {
  name: string;
  description: string;
  transaction: [];
}) => {
  try {
    return accountBookMethodModel.create({
      name,
      description,
      transaction,
    });
  } catch (error) {
    return { statusCode: 500 };
  }
};

export default { getAllAccountBookMethods, createAccountBookMethods };
