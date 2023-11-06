"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useIncome;

var _reactCookie = require("react-cookie");

var _getCurrentUserId = require("../utils/getCurrentUserId");

var _incomeValidations = require("../utils/incomeValidations");

var _getCompleteDate = _interopRequireDefault(require("../utils/getCompleteDate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useIncome() {
  var _useCookies = (0, _reactCookie.useCookies)(),
      _useCookies2 = _slicedToArray(_useCookies, 2),
      cookies = _useCookies2[0],
      setCookies = _useCookies2[1];

  var getIncomes = function getIncomes() {};

  var updateIncomes = function updateIncomes() {};

  var deleteIncomeById = function deleteIncomeById() {};

  var addNewIncome = function addNewIncome(_DATA) {
    var user, date, DATA, _RESPONSE, data;

    return regeneratorRuntime.async(function addNewIncome$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // CHECK IF USER ID EXISTS!
            user = (0, _getCurrentUserId.getCurrentUserId)(cookies['@authTokenExpense']); // NOW VALIDATE THIS DATA!

            (0, _incomeValidations.ValidateIncomeData)(_DATA);
            date = (0, _getCompleteDate["default"])();
            DATA = _objectSpread({}, date, {}, _DATA, {
              userId: user.userId
            });
            fetch('http://localhost:4444/api/income/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
              },
              body: JSON.stringify(DATA)
            }).then(function (response) {
              return response.json().then(function (data) {
                return console.log('OLD: ', data);
              });
            });
            _context.next = 8;
            return regeneratorRuntime.awrap(fetch('http://localhost:4444/api/income/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
              },
              body: JSON.stringify(DATA)
            }));

          case 8:
            _RESPONSE = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(_RESPONSE.json().then());

          case 11:
            data = _context.sent;
            console.log('NEW:', data);
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log('ADD NEW INCOME ERROR! ', _context.t0);
            return _context.abrupt("return", {
              error: true,
              message: _context.t0.message
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 15]]);
  };

  return {
    getIncomes: getIncomes,
    updateIncomes: updateIncomes,
    deleteIncomeById: deleteIncomeById,
    addNewIncome: addNewIncome
  };
}