import path from 'path'
import { userModel } from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constant.js'
import { resetPasswordMail } from '../utils/sendMail.js'

// CREATE NEW USER ROUTE CONTROLLER !!
export const newUserAccount = async (req, res) => {
  try {
    // GET DATA FROM BODY!
    const { password, name, email } = req.body

    console.log(email, password, name)

    // VERIFY IF EMAIL IS NOT ALREADY PRESENT!
    const user = await userModel.findOne({ email })
    if (user?.email)
      return res
        .status(403)
        .json({ message: 'Email is already present!', error: true })

    // CREATE NEW USER!
    const newUser = await userModel.create({ password, name, email })

    // RETURN SUCCESS RESPONSE!
    return res
      .status(200)
      .json({ message: 'User created successfully!', success: true, newUser })
  } catch (error) {
    console.log('Error-> ', error.message)
    return res.status(500).json({ message: 'Server error!', error: true })
  }
}
// LOGIN HANDLER!
export const loginUser = async (req, res) => {
  try {
    // GET DATA FROM BODY!
    const { email, password } = req.body
    console.log(email, password)
    // CHECK IF ANY IS EMPTY!
    const isNotValid = !email || !password

    if (isNotValid)
      return res.status(400).json({ message: 'Invalid data!', error: true })

    // FIND USER IN DATABASE!
    const isUser = await userModel.findOne({ email })

    console.log('User ', isUser)

    // IF USER NOT FOUND!
    if (!isUser?.email)
      return res.status(404).json({ message: 'User not found!', error: true })

    // ELSE CHECK IS PASSWORDS MATCHED!
    const isPass = password !== isUser?.password

    // IF PASSWORD NOT MATCHED!
    if (isPass)
      return res
        .status(400)
        .json({ message: 'Invalid credentials!', error: true })

    // CHECK IF ACCOUNT IS DEACTIVATED !!
    const isDeactivated = isUser?.isAccountDeactivated
    if (isDeactivated)
      return res
        .status(400)
        .json({ message: 'Account is deactivated!', error: true })

    // ELSE CREATE TOKEN!
    const token = jwt.sign({ id: isUser._id }, JWT_SECRET, { expiresIn: '1h' })

    console.log('TOKEN -> ', token)

    // RETURN SUCCESS RESPONSE!
    res.cookie('@authExpense', token, {
      withCredentials: true,
      httpOnly: false
    })
    res.status(200).json({
      message: 'Login successful!',
      success: true,
      token,
      userDoc: isUser
    })
  } catch (error) {
    console.log('LOGIN ERROR-> ', error.message)
  }
}

export const resetPassword = async (req, res) => {
  try {
    // GET DATA!
    const { email } = req.body

    console.log('1')

    if (!email) {
      return res.status(400).json({
        message: 'Invalid data!',
        error: true
      })
    }

    console.log('2')

    // FIND IF EMAIL EXISTS!
    const user = await userModel.findOne({ email })

    console.log('3')

    // IF USER NOT EXISTS!
    if (!user?.email) {
      return res.status(404).json({ message: 'User not found!', error: true })
    }
    console.log('4')

    // GENERATE TOKEN!
    const token = jwt.sign({ id: user._id }, JWT_SECRET)

    console.log('5')

    // SEND MAIL TO EMAIL!
    await resetPasswordMail(email, token)

    user.resetPasswordToken = token

    await user.save()

    // IF USER EXISTS!
    res.status(200).json({ success: true, message: 'Email Sent!' })
  } catch (error) {
    res.status(504).json({ error: true, message: error?.message })
  }
}

export const checkVerifyPasswordPage = async (req, res) => {
  try {
    // GET TOKEN!
    const { token } = req.query

    // CHECK FOR USER!
    const user = await userModel.findOne({ resetPasswordToken: token })

    // IF NO USER FOUND!
    if (!user?.email) {
      return res.status(404).json({ message: 'User not found!', error: true })
    }

    res.status(200).json({ success: true, message: 'User found!' })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
}

export const newPassword = async (req, res) => {
  try {
    const { password, userId } = req.body

    await userModel.findOneAndUpdate(
      { _id: userId },
      { password: password, resetPasswordToken: undefined }
    )

    res.status(200).json({ success: true, message: 'Password Changed!' })
  } catch (error) {
    res.status(504).json({ error: true, message: error?.message })
  }
}
