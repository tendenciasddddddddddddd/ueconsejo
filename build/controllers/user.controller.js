"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = exports.activate = exports.createUser = exports.getRoles = exports.deleteUsuariosById = exports.updateUsuariosById = exports.getUsuariosById = exports.getBuscadorUsuarios = exports.getUsuarios = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require("mongoose");

var getUsuarios = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var limit = parseInt(req.query.take);
      var skip = parseInt(req.query.page);
      var total = yield _User.default.countDocuments({
        typo: {
          $in: ["ADMS"]
        }
      });
      var paginas = Math.ceil(total / limit);
      var usuarios = yield _User.default.find({
        typo: {
          $in: ["ADMS"]
        }
      }).skip(limit * skip - limit).limit(limit);
      var coleccion = {
        usuarios: usuarios,
        pagina: skip,
        paginas: paginas,
        total: total
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getUsuarios(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsuarios = getUsuarios;

var getBuscadorUsuarios = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var usuarios = yield _User.default.find({
        typo: {
          $in: ["ADMS"]
        }
      }).lean().select({
        fullname: 1,
        cedula: 1,
        email: 1,
        status: 1
      });
      var coleccion = {
        usuarios: usuarios
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getBuscadorUsuarios(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getBuscadorUsuarios = getBuscadorUsuarios;

var getUsuariosById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var UsuariosId = mongoose.Types.ObjectId(req.params.id);
      var usuarios = yield _User.default.findById(UsuariosId);
      res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getUsuariosById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUsuariosById = getUsuariosById;

var updateUsuariosById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      req.body.roles = req.body.role;
      var updatedUsuarios = yield _User.default.findByIdAndUpdate(req.params.usuariosId, req.body, {
        new: true
      });
      res.status(200).json(updatedUsuarios);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function updateUsuariosById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUsuariosById = updateUsuariosById;

var deleteUsuariosById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _User.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteUsuariosById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUsuariosById = deleteUsuariosById;

var getRoles = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var roless = yield _Role.default.find({
        name: {
          $in: ["Admin", "Vicerrector", "Inspector", "Docente"]
        }
      });
      return res.json(roless);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getRoles(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getRoles = getRoles;

var createUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        email,
        password,
        roles
      } = req.body;
      var rolesFound = yield _Role.default.find({
        name: {
          $in: roles
        }
      });
      var user = new _User.default({
        username,
        email,
        password,
        roles: rolesFound.map(role => role._id)
      });
      user.password = yield _User.default.encryptPassword(user.password);
      var savedUser = yield user.save();
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles
      });
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function createUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var activate = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res, next) {
    try {
      var reg = yield _User.default.findByIdAndUpdate({
        _id: req.params.id
      }, {
        status: req.query.state
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  });

  return function activate(_x15, _x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();

exports.activate = activate;

var query = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var querys = req.query.querys;
      var result = yield _User.default.find({
        fullname: {
          '$regex': querys,
          "$options": "i"
        },
        typo: {
          $in: ["ADMS"]
        }
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
    }
  });

  return function query(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();

exports.query = query;