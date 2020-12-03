import Category from '@interfaces/category';
import { CategoryModel } from './schema';

const get = async (): Promise<Category[]> => {
  const defaultCategories = await CategoryModel.find();
  return defaultCategories;
};

export default { get };
