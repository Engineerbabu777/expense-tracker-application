import { budgetModel } from '../models/budgetModel.js'
import { categoryModel } from '../models/categoryModel.js'
import { expenseModel } from '../models/expenseModel.js'
import { incomeModel } from '../models/incomeModel.js'
import { userModel } from '../models/userModel.js'
import crypto from 'crypto'
import { userAccountDeactivationMail } from '../utils/sendMail.js'

// CURRENT USER DATA CONTROLLER!
export const getCurrentUserData = async (req, res) => {
  try {
    // GET DATA FROM QUERY PARAMETERS!!
    const { userId } = req.query

    // FIND THAT USER!
    const currentUser = await userModel.findById(userId)

    console.log('USERID: ', userId, 'USER DATA:', currentUser)

    // RETURN RESPONSE OF USER NOT EXISTS IN OUR DATABASE!
    if (!currentUser?.email) {
      return res.status(403).json({ message: 'User not found!', error: true })
    }

    // RETURN SUCCESS RESPONSE!
    return res
      .status(200)
      .json({ message: 'User Found successfully!', success: true, currentUser })
  } catch (error) {
    console.log('Error-> ', error.message)
    return res.status(500).json({ message: 'Server error!', error: true })
  }
}

// UPDATE USER CONTROLLER!
export const updateUserData = async (req, res) => {
  try {
    // GET DATA FROM BODY!
    const { password, name, email, userId } = req.body

    console.log('Update body: ', req.body)

    // FIND THAT USER!
    const currentUser = await userModel.findById(userId)

    // RETURN RESPONSE OF USER NOT EXISTS IN OUR DATABASE!
    if (!currentUser?.email) {
      return res.status(403).json({ message: 'User not found!', error: true })
    }

    console.log('USER: ', currentUser)
    //MATCH THE PASSWORD!
    if (currentUser.password !== password) {
      return res
        .status(403)
        .json({ message: 'Incorrect password!', error: true })
    }

    // UPDATE THE DATA!
    currentUser.name = name
    currentUser.email = email

    // SAVE THE USER!
    await currentUser.save()

    // RETURN SUCCESS RESPONSE!
    return res.status(200).json({
      message: 'User updated successfully!',
      success: true,
      currentUser
    })
  } catch (error) {
    console.log('Error in updating user data-> ', error.message)
    return res.status(500).json({ message: 'Server error!', error: true })
  }
}

// DELETE: USER ACCOUNT WITH ALL ITS DATA!
export const accountDeletion = async (req, res) => {
  try {
    // GET USER ID!
    const { userId } = req.query

    // FIND THAT USER!
    const currentUser = await userModel.findById(userId)
    if (!currentUser?.email) {
      return res.status(401).json({ message: 'User not found!', error: true })
    }

    // DELETE ACCOUNT -> !
    await userModel.findByIdAndDelete(userId)
    // DELETE THE DATA -> !!
    // DELETE BUDGETS!
    await budgetModel.deleteMany({ userId })
    // DELETE CATEGORIES!
    await categoryModel.deleteMany({ userId })

    // DELETE TRANSACTIONS!
    await incomeModel.deleteMany({ userId })
    await expenseModel.deleteMany({ userId })

    // RETUNING RESPONSE BACK!
    res.status(200).json({ message: 'User Account deleted successfully!' })
  } catch (err) {
    // RETURNING THE ERROR RESPONSE!

    console.log('USER ACCOUNT DELETION ERROR: ', err.message)
    res.status(504).json({ message: 'User account deletion failed!' })
  }
}

// USER DATA DELETION CONTROLLER!!
export const userDataDeletion = async (req, res) => {
  try {
    // GET USER ID!
    const { userId } = req.query

    // DELETE BUDGETS!
    await budgetModel.deleteMany({ userId })

    // DELETE CATEGORIES!
    await categoryModel.deleteMany({ userId })

    // DELETE TRANSACTIONS!
    await incomeModel.deleteMany({ userId })
    await expenseModel.deleteMany({ userId })

    // RETUNING RESPONSE BACK!
    res.status(200).json({ message: 'User data deleted successfully!' })
  } catch (err) {
    console.log('USER DATA DELETION ERROR: ', err.message)
    res.status(504).json({ message: 'User data deleted failed!' })
  }
}

// USER ACCOUNT DEACTIVATION!!
export const userAccountDeactivation = async (req, res) => {
  try {
    // GET USER ID!
    const { userId } = req.query

    // GET THE USER !!
    const user = await userModel.findById(userId)
    // FIND THAT USER!
    const currentUser = await userModel.findById(userId)
    if (!currentUser?.email) {
      return res.status(401).json({ message: 'User not found!', error: true })
    }

    // SET ACTIVATION TOKEN!!
    user.activationToken = crypto.randomBytes(20).toString('hex')

    // SET ACTIVATION TOKEN UNTIL FOR 30 DAYS APPLICABLE!
    user.activationTokenExpires = Date.now() + 30 * 24 * 60 * 60 * 100

    // SET USER ACCOUNT TO DEACTIVATED!
    user.isAccountDeactivated = true

    // SEND THE ACTIVATION LINK TO EMAIL!
    const response = await userAccountDeactivationMail(
      user?.email,
      user.activationToken
    )

    // UPDATING THE USER DOC!
    await user.save()

    // RETUNING RESPONSE BACK!
    res.status.json({ success: true, message: 'Account has been deactivated!' })
  } catch (err) {
    // RETURNING THE ERROR RESPONSE!
    console.log('USER ACCOUNT DEACTIVATION ERROR: ', err.message)
    res.status(504).json({ message: 'User account deactivation failed!' })
  }
}

// USER ACCOUNT ACTIVATION!
export const userAccountActivation = async (req, res) => {
  try {
    // GET TOKEN!
    const { token } = req.params

    // GET THE USER WITH THAT TOKEN !!
    const user = await userModel.findOne({ activationToken: token })
    // IF NO USER THEN GIVE ERROR RESULT!
    if (!user?.email) {
      return res.status(401).json({ message: 'User not found!', error: true })
    }

    // IF TOKEN IS FAILED THEN GIVE ERROR!
    if (user.activationTokenExpires < Date.now()) {
      return res.status(401).json({ message: 'Token expired!', error: true })
    }

    // IF TOKEN IS SUCCESS THEN ACTIVATE THE USER ACCOUNT!
    user.activationToken = undefined
    user.activationTokenExpires = undefined

    // SET USER ACCOUNT TO ACTIVATED!
    user.isAccountDeactivated = false

    // UPDATE THE USER!!
    await user.save()

    // RETUNING RESPONSE BACK!
    res
      .status(200)
      .json({ success: true, message: 'Account has been activated!' })
  } catch (err) {
    // RETURNING THE ERROR RESPONSE!
    console.log('USER ACCOUNT ACTIVATION ERROR: ', err.message)
    res.status(504).json({ message: 'User account deactivation failed!' })
  }
}
