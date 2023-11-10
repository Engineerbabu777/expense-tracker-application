import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    description: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    },
    month: String,
    day: Number,
    year: Number,
    money: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const expenseModel =
  mongoose?.models?.expense || mongoose.model('expense', expenseSchema)
