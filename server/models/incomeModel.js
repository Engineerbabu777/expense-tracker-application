import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    type: {
      type: String,
      required: true
    },

    money: {
      type: Number,
      required: true
    },
    month: String,
    year: Number,
    date: Number,
    source: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const incomeModel =
  mongoose?.models?.income || mongoose.model('income', incomeSchema)
