import mongoose from 'mongoose'

const monthlyCategorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  month: String,
  year: Number,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  currency: String,
  monthlyLimit: Number
})

export const monthlyCategoryModel =
  mongoose?.models?.monthlyCategory ||
  mongoose.model('monthlyCategory', monthlyCategorySchema)
