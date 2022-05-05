"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var productSchema = new _mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  //********************************NUEVOS CAMPOS PARA USUARIOS ADMINISTRADORES
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    unique: true
  },
  foto: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 1
  },
  telefono: {
    type: String,
    required: true
  },
  fullname: String,
  //---------------TIPO DE DOCUMENTOS
  typo: {
    type: String
  },
  //------------------------DATOS ESTUDIANTE--------------
  sexo: String,
  fketnia: String,
  fknacionalidad: String,

  /* telefonofijo: String, */
  fkparroquia: String,
  modalidad: String,

  /*    calles: String,
     referencia: String,
     modalidad: String,
     codigo: String,
     numeric: String,
     nombrec: String,
     edad: String, */
  //---------------TIPO docentes
  titulo: String,
  //---------------TIPO MAS DATOS
  roles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }]
}, {
  timestamps: true,
  versionKey: false
});

productSchema.statics.encryptPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (password) {
    var salt = yield _bcryptjs.default.genSalt(10);
    return yield _bcryptjs.default.hash(password, salt);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

productSchema.statics.comparePassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (password, receivedPassword) {
    return yield _bcryptjs.default.compare(password, receivedPassword);
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = (0, _mongoose.model)("User", productSchema);

exports.default = _default;