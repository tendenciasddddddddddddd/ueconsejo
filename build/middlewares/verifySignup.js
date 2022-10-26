"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matriculaDuplicada = exports.checkRolesExisted = exports.checkDuplicateUsernameOrEmail = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = require("../models/Role");

var _Matriculas = _interopRequireDefault(require("../models/Matricula/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  ObjectID
} = require('mongodb');

var checkDuplicateUsernameOrEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var user = yield _User.default.findOne({
        cedula: req.body.cedula
      });
      if (user) return res.status(400).json({
        message: "El numero de cédula ya existe"
      });
      next();
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  });

  return function checkDuplicateUsernameOrEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;

var checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!_Role.ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: "Role ".concat(req.body.roles[i], " does not exist")
        });
      }
    }
  }

  next();
};

exports.checkRolesExisted = checkRolesExisted;

var matriculaDuplicada = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var per = yield _Matriculas.default.findOne({
        academico: req.body.academico,
        fkestudiante: req.body.fkestudiante
      });

      if (per) {
        return res.status(400).json({
          message: "El estudiante ya esta matriculado"
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        message: erro
      });
    }
  });

  return function matriculaDuplicada(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.matriculaDuplicada = matriculaDuplicada;