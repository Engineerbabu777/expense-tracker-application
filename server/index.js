// OUR REQUIRED PACKAGES FOR PROJECT!
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const user = require('./controllers/userController')
const cors = require('cors')
const databaseConnect = require('./database')

// CREATING EXPRESS SERVER APP!
const app = express()

// NECESSARY MIDDLEWARES!
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// HANDLING ROUTES!
app.use('/api/user', user)

// CONNECTING WITH DATABASE!
databaseConnect()

// RUNNING OUR SERVER APP!
app.listen(4444, () => {
  console.log('Server is running on PORT-> 4444')
})
