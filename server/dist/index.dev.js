"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _database = require("./database.js");

var _category = _interopRequireDefault(require("./routes/category.js"));

var _budgetRoutes = _interopRequireDefault(require("./routes/budgetRoutes.js"));

var _income = _interopRequireDefault(require("./routes/income.js"));

var _expense = _interopRequireDefault(require("./routes/expense.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// IMPORTING OUR REQUIRED PACKAGES FOR PROJECT!
// CREATING EXPRESS SERVER APP!
var app = (0, _express["default"])(); // NECESSARY MIDDLEWARES!

app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])()); //!! ROUTES START WITH /api/auth WILL BE HANDLED BY THIS ROUTE!)

app.use('/api/auth', _auth["default"]); //!! HERE WE ARE HANDLING AUTH ROUTES (LOGIN! /REGISTER! /RESET!)
//!! ROUTES START WITH /api/expenses WILL BE HANDLED BY THIS ROUTE!

app.use('/api/category', _category["default"]); //!! ROUTES START WITH /api/expenses WILL BE HANDLED BY THIS ROUTE!

app.use('/api/budget', _budgetRoutes["default"]); //!! ROUTES START WITH /api/income WILL BE HANDLED BY THIS ROUTE!

app.use('/api/income', _income["default"]); //!! ROUTES START WITH /api/expense WILL BE HANDLED BY THIS ROUTE!

app.use('/api/expense', _expense["default"]); // CONNECTING WITH DATABASE!

(0, _database.databaseConnect)(); // RUNNING OUR SERVER APP!

app.listen(4444, function () {
  console.log('Server is running on PORT-> 4444');
});