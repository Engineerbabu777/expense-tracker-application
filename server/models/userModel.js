import mongoose from 'mongoose'

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
    image: {
      type: String,
      default:
        'https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png'
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
    notifications: [
      {
        Date: {
          month: String,
          year: Number,
          date: Number
        },
        message: String
      }
    ],
    // userDefinedCategories: [
    //   {
    //     name: String,
    //     color: String,
    //     categoryId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'category'
    //     },
        
    //   }
    // ]
  },
  {
    timestamps: true
  }
)

export const userModel =
  mongoose?.models?.user || mongoose.model('user', userSchema)
