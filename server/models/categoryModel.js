import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  categoryName: String,
  currency: String,
  userId: { type: mongoose.Schema.ObjectId, require: true },
  colorCode: String,
  categoryLimit: Number
})

export const categoryModel =
  mongoose?.models?.category || mongoose.model('category', categorySchema)
