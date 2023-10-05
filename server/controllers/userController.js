const express = require('express')
const path = require('path')
const userModel = require('../models/userModel')
const router = express.Router()
const bcryptjs = require('bcryptjs')

// CREATE NEW USER ROUTE HANDLER !!
router.post('/create-user', async (req, res) => {
  try {
    // GET DATA FROM REQ_BODY!
    const { name, email, password, username } = req.body

    // CHECK FROM DATA IF EMAIL IS ALREADY EXISTS!
    const emailExists = await userModel.findOne({ email })

    // console.log(emailExists)

    // If EMAIL EXISTS!
    if (emailExists?.email === email) {
      res.status(400).json({ error: 'Email already exists' })
      res.end()
      return
    }

    // CREATE SECRET PASSWORD USING BCRYPTJS !!

    // ELSE CREATE NEW USER!
    await userModel.create({
      name,
      email,
      password,
      username
      // image: fileUrl // later
    })

    res
      .status(200)
      .json({ success: true, message: 'User created successfully' })
    res.end()
  } catch (error) {
    console.log('ERROR WHILE CREATING NEW USER-> ', error.message)
    res.status(504).json({ error: true, message: 'Internal Server Error' })
    res.end()
  }
})

// LOGIN USER ROUTE HANDLER !!
router.post('/login', (req, res) => {})

module.exports = router
