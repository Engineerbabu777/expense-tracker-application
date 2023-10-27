import mongoose from 'mongoose'

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    month: String,
    date: Number,
    year: Number,
    totalIncome: {
      value: Number,
      currency: String
    },
    totalExpenses: {
      value: Number,
      currency: String
    },
    totalSavings: {
      value: Number,
      currency: String
    }
  },
  {
    timestamps: true
  }
)

export const budgetModel =
  mongoose.models?.budget || mongoose.model('budget', budgetSchema)
