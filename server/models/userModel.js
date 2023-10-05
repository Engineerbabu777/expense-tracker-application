const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    resetPasswordToken: String,
    resetPasswordTime: Date
  },
  {
    timestamps: true
  }
)

userModel = mongoose?.models?.user || mongoose.model('user', userSchema)

module.exports = userModel
