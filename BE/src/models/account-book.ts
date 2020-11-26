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

const getAllAccountBookMethods = async () => {
  try {
    return await accountBookMethodModel.find();
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
};

const createAccountBookMethods = async ({
  name,
  description,
  transaction,
}: {
  name: string;
  description: string;
  transaction: [];
}) => {
  try {
    return await accountBookMethodModel.create({
      name,
      description,
      transaction,
    });
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
};

export default { getAllAccountBookMethods, createAccountBookMethods };
