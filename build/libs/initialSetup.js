"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aplicaciones = exports.config = exports.createAdmin = exports.createRoles = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _Configure = _interopRequireDefault(require("../models/Configure"));

var _Apps = _interopRequireDefault(require("../models/Apps"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      var count = yield _Role.default.estimatedDocumentCount();
      if (count > 0) return;
      var values = yield Promise.all([new _Role.default({
        name: "Estudiante"
      }).save(), //user
      new _Role.default({
        name: "Docente"
      }).save(), //moderator
      new _Role.default({
        name: "Admin"
      }).save(), //admin
      new _Role.default({
        name: "Vicerrector"
      }).save(), //admin
      new _Role.default({
        name: "Inspector"
      }).save() //admin
      ]);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  });

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    var user = yield _User.default.findOne({
      email: "10004095632w@gmailcom"
    });
    var roles = yield _Role.default.find({
      name: {
        $in: ["Admin"]
      }
    });

    if (!user) {
      yield _User.default.create({
        email: "10004095632w@gmail.com",
        password: yield _bcryptjs.default.hash("Medid100.", 10),
        roles: roles.map(role => role._id),
        //****APARTIR DE A1QUI LOS NUEVOS DATOS
        nombres: "Esteban Wladimir",
        apellidos: "Martinez Martinez",
        fullname: "Martinez Martinez Esteban Wladimir",
        cedula: "1004095632",
        foto: "https://res.cloudinary.com/ds7xbwpoo/image/upload/v1668542101/avatar_lmylxp.webp",
        status: "Activo",
        telefono: "0995283857"
      });
      console.log('Admin User Created!');
    }
  });

  return function createAdmin() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAdmin = createAdmin;

var config = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    yield _Configure.default.deleteMany();
    yield _Configure.default.create({
      logo: 'https://res.cloudinary.com/ds7xbwpoo/image/upload/v1668542101/avatar_lmylxp.webp',
      unidadeducativa: 'xxxx xxxx xxxx xxxx',
      ubicacion: 'xxxx xxxx xxxx xxxx',
      telefono: 'xxxx xxxx xxxx xxxx',
      direccion: 'xxxx xxxx xxxx xxxx',
      rector: 'xxxx xxxx xxxx xxxx',
      vicerector: 'xxxx xxxx xxxx xxxx',
      secretario: 'xxxx xxxx xxxx xxxx',
      inspector: 'xxxx xxxx xxxx xxxx'
    });
    console.log('config create');
  });

  return function config() {
    return _ref3.apply(this, arguments);
  };
}();

exports.config = config;

var aplicaciones = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
    yield _Apps.default.deleteMany();
    yield _Apps.default.create({
      web: 'xxxx xxxx xxxx xxxx',
      movil: 'xxxx xxxx xxxx xxxx'
    });
    console.log('config create');
  });

  return function aplicaciones() {
    return _ref4.apply(this, arguments);
  };
}();

exports.aplicaciones = aplicaciones;