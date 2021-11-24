"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPassword = exports.resetPassword = exports.newPassword = exports.cuenta = exports.googleAuthApi = exports.signin = exports.signUp = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _ResetEmail = _interopRequireDefault(require("../conf/ResetEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//const timer1 = (ms) => new Promise((res) => setTimeout(res, ms));
var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      // Getting the Request Body
      var {
        username,
        email,
        password,
        roles,
        nombres,
        apellidos,
        status,
        telefono,
        cedula,
        foto,
        typo,
        fullname
      } = req.body; // Creating a new User Object

      var newUser = new _User.default({
        username,
        email,
        nombres,
        apellidos,
        status,
        telefono,
        foto,
        cedula,
        typo,
        fullname,
        password: yield _User.default.encryptPassword(password)
      }); // checking for roles

      if (req.body.role) {
        newUser.roles = req.body.role;
      } else {
        var role = yield _Role.default.findOne({
          name: "Docente"
        });
        newUser.roles = [role._id];
      } // Saving the User Object in Mongodb


      newUser.roles = req.body.role;
      var savedUser = yield newUser.save();
      return res.status(200).json({
        savedUser
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //---------------------------------------------------------LOGIN ACCESS--------------------------


exports.signUp = signUp;

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      // EL CUERPO DE CORREO O EL CUERPO DE USERNAME
      var userFound = yield _User.default.findOne({
        email: req.body.email
      }).populate("roles"); //VERIFICAR sI EL USUARIO EXISTE EN BASE DE DATOS

      if (!userFound) return res.status(400).json({
        message: "User Not Found 1"
      }); //SI EXISTE PASA A VERIFICAR Y DESENCRIPTAR LA CONTRASEÑA

      var matchPassword = yield _User.default.comparePassword(req.body.password, userFound.password); //RETORNA EL RESULATDO

      if (!matchPassword) return res.status(402).json({
        token: null,
        message: "Invalid Password"
      }); //OPTENERMOS EL ROL

      var toles = null;
      var roles = yield _Role.default.find({
        _id: {
          $in: userFound.roles
        }
      });

      for (var i = 0; i < roles.length; i++) {
        toles = roles[0].name;
      }

      var token = _jsonwebtoken.default.sign({
        id: userFound._id,
        role: toles
      }, _config.default.SECRET, {
        expiresIn: '40d' // 24 hours

      });

      if (!userFound.modalidad) {
        userFound.modalidad = 'none';
      } //REGISTRO INICIO DE SECCION


      var isaccesos = {
        tokens: token,
        foto: userFound.foto,
        nombre: userFound.fullname,
        email: userFound.email,
        modalidad: userFound.modalidad
      };
      res.status(200).json({
        isaccesos
      });
    } catch (error) {
      console.log(error);
    }
  });

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //---------------------------------------------------------VUE OUTH GOOGLE API--------------------------


exports.signin = signin;

var googleAuthApi = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      // EL CUERPO DE CORREO O EL CUERPO DE USERNAME
      var userFound = yield _User.default.findOne({
        email: req.body.email
      }).populate("roles"); //VERIFICAR sI EL USUARIO EXISTE EN BASE DE DATOS

      if (!userFound) return res.status(400).json({
        message: "User Not Found 1"
      }); //OPTENERMOS EL ROL

      var toles = null;
      var roles = yield _Role.default.find({
        _id: {
          $in: userFound.roles
        }
      });

      for (var i = 0; i < roles.length; i++) {
        toles = roles[0].name;
      }

      var token = _jsonwebtoken.default.sign({
        id: userFound._id,
        role: toles
      }, _config.default.SECRET, {
        expiresIn: '5d' // 24 hours

      });

      if (!userFound.modalidad) {
        userFound.modalidad = 'none';
      } //REGISTRO INICIO DE SECCION


      var isaccesos = {
        tokens: token,
        foto: userFound.foto,
        nombre: userFound.fullname,
        email: userFound.email,
        modalidad: userFound.modalidad
      };
      res.status(200).json({
        isaccesos
      });
    } catch (error) {
      console.log(error);
    }
  });

  return function googleAuthApi(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.googleAuthApi = googleAuthApi;

var cuenta = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _User.default.findOne({
        _id: req.body.id
      });
      if (!userFound) return res.status(400).json({
        message: "User Not Found 1"
      });
      var matchPassword = yield _User.default.comparePassword(req.body.password, userFound.password);
      if (!matchPassword) return res.status(402).json({
        token: null,
        message: "Contraseña Invalida"
      });
      res.status(200).json({
        message: "Contraseña Correcta"
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function cuenta(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.cuenta = cuenta;

var newPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      req.body.password = yield _User.default.encryptPassword(req.body.password);
      var updatedPassword = yield _User.default.findByIdAndUpdate(req.params.cuentaId, req.body, {
        new: true
      });
      res.status(200).json(updatedPassword);
    } catch (err) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function newPassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //RESET PASWWORF----------------------------------


exports.newPassword = newPassword;

var generateRandomString = num => {
  var result1 = Math.random().toString(36).substring(0, num);
  return result1;
};

var resetPassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _User.default.findOne({
        email: req.body.email
      });
      if (!userFound) return res.status(400).json({
        message: "User Not Found 1"
      });
      var code = generateRandomString(6);

      _ResetEmail.default.sendMail(req.body.email, code);

      res.status(200).json({
        code
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function resetPassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;

var forgotPassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _User.default.findOne({
        email: req.body.email
      });
      req.body.password = yield _User.default.encryptPassword(req.body.password);
      var updatedPassword = yield _User.default.findByIdAndUpdate(userFound._id, req.body, {
        new: true
      });
      res.status(200).json(updatedPassword);
    } catch (err) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function forgotPassword(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.forgotPassword = forgotPassword;