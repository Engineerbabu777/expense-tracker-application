
// IMPORTING OUR REQUIRED PACKAGES FOR PROJECT!

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import {databaseConnect} from './database.js';


// CREATING EXPRESS SERVER APP!
const app = express()

// NECESSARY MIDDLEWARES!
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


 //!! ROUTES START WITH /api/auth WILL BE HANDLED BY THIS ROUTE!)
app.use('/api/auth', authRoutes)  //!! HERE WE ARE HANDLING AUTH ROUTES (LOGIN! /REGISTER! /RESET!)

// CONNECTING WITH DATABASE!
databaseConnect();

// RUNNING OUR SERVER APP!
app.listen(4444, () => {
  console.log('Server is running on PORT-> 4444')
})
