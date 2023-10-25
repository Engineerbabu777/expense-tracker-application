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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    },
    date: {
      month: String,
      date: Number,
      year: Number
    },
    amount: {
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
