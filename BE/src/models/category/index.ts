import { Category, CategoryModel } from './schema';

const get = async (): Promise<Category[]> => {
  const defaultCategories = await CategoryModel.find();
  return defaultCategories;
};

export default { get };
