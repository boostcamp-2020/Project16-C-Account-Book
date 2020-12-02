import mongoose from 'mongoose';

export interface Category extends mongoose.Document {
  name: string;
  icon: number;
}

export const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: Number, required: true },
});

export const CategoryModel = mongoose.model<Category>(
  'default_categories',
  Schema,
);
