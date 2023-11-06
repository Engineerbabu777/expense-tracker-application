import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    money: {
      type: Number,
      required: true
    },
    month: String,
    year: Number,
    day: Number,
    source: {
      type: String,
      required: true
    },
    currency:String,
  },
  {
    timestamps: true
  }
)

export const incomeModel =
  mongoose?.models?.income || mongoose.model('income', incomeSchema)
