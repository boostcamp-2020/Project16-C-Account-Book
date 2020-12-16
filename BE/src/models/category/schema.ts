import mongoose from 'mongoose';
import Category from '@interfaces/category';

export interface CategoryDoc extends Category, mongoose.Document {}

export const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  icon: { type: Number, required: true },
});

export const CategoryModel = mongoose.model<CategoryDoc>('Default_categories', Schema);
