"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPaises = void 0;

var _Paises = _interopRequireDefault(require("../models/Paises"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createPaises = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      estado
    } = req.body;

    try {
      var newPaises = new _Paises.default({
        nombre,
        estado
      });
      var PaisesSaved = yield newPaises.save();
      res.status(201).json(PaisesSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createPaises(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPaises = createPaises;