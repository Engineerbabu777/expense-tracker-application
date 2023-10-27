import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  categoryName: String,
  userId: { type: mongoose.Schema.ObjectId, require: true,ref:'user' },
  colorCode: String,
})

export const categoryModel =
  mongoose?.models?.category || mongoose.model('category', categorySchema)
