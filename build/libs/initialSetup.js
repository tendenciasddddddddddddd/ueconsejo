"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.userest = exports.userdev = exports.createAdmin = exports.createRoles = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _Configure = _interopRequireDefault(require("../models/Configure"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var faker = require('faker');

var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      // Count Documents
      var count = yield _Role.default.estimatedDocumentCount(); // check for existing roles

      if (count > 0) return; // Create default Roles

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
    // check for an existing admin user
    var user = yield _User.default.findOne({
      email: "10004095632w@gmailcom"
    }); // get roles _id

    var roles = yield _Role.default.find({
      name: {
        $in: ["Admin"]
      }
    });

    if (!user) {
      // create a new admin user
      yield _User.default.create({
        email: "10004095632w@gmail.com",
        password: yield _bcryptjs.default.hash("Medid100.", 10),
        roles: roles.map(role => role._id),
        //****APARTIR DE A1QUI LOS NUEVOS DATOS
        nombres: "Esteban Wladimir",
        apellidos: "Martinez Martinez",
        fullname: "Martinez Martinez Esteban Wladimir",
        cedula: "1004095632",
        foto: "https://res.cloudinary.com/dvpp07pji/image/upload/v1665121545/profile_p23jj9.png",
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

var userdev = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    var roles = yield _Role.default.find({
      name: {
        $in: ["Docente"]
      }
    });

    for (var i = 0; i < 60; i++) {
      yield _User.default.create({
        roles: roles.map(role => role._id),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        nombres: faker.name.firstName(),
        apellidos: faker.name.lastName(),
        status: "1",
        telefono: faker.phone.phoneNumber(),
        foto: "https://res.cloudinary.com/dvpp07pji/image/upload/v1665121545/profile_p23jj9.png",
        cedula: faker.finance.routingNumber(),
        typo: "DOCS",
        fullname: faker.name.findName(),
        password: yield _bcryptjs.default.hash("123456", 10),
        sexo: "Femenino",
        fketnia: "Mestizo",
        fknacionalidad: "Colombia",
        fkparroquia: "Caldera",
        titulo: "Titulo lic"
      });
    }

    console.log('100 Records Created');
  });

  return function userdev() {
    return _ref3.apply(this, arguments);
  };
}();

exports.userdev = userdev;

var userest = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
    var roles = yield _Role.default.find({
      name: {
        $in: ["Estudiante"]
      }
    });

    for (var i = 0; i < 300; i++) {
      yield _User.default.create({
        roles: roles.map(role => role._id),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        nombres: faker.name.firstName(),
        apellidos: faker.name.lastName(),
        status: "1",
        telefono: faker.phone.phoneNumber(),
        foto: "https://res.cloudinary.com/dvpp07pji/image/upload/v1665121545/profile_p23jj9.png",
        cedula: faker.finance.routingNumber(),
        typo: "ESTS",
        fullname: faker.name.findName(),
        password: yield _bcryptjs.default.hash("123456", 10),
        sexo: "Masculino",
        fketnia: "Mestizo",
        fknacionalidad: "Colombia",
        fkparroquia: "Monte Olivo"
      });
    }

    console.log('100 Records Created');
  });

  return function userest() {
    return _ref4.apply(this, arguments);
  };
}();

exports.userest = userest;

var config = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* () {
    yield _Configure.default.create({
      rector: 'xxxx xxxx xxxx xxxx',
      vicerector: 'xxxx xxxx xxxx xxxx',
      secretario: 'xxxx xxxx xxxx xxxx',
      inspector: 'xxxx xxxx xxxx xxxx'
    });
    console.log('config create');
  });

  return function config() {
    return _ref5.apply(this, arguments);
  };
}();

exports.config = config;