"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expenseController = require("../controllers/expenseController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expenseRoutes = _express["default"].Router();

expenseRoutes.post('/add', _expenseController.addNewExpense);
expenseRoutes["delete"]('/deleteById', _expenseController.deleteExpenseById);
var _default = expenseRoutes;
exports["default"] = _default;