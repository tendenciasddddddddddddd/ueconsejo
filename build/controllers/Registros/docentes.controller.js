"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDocentes = exports.deleteDocenteById = exports.updateDocenteById = exports.getDocenteById = exports.getListasDocentes = exports.getDocentes = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _Role = _interopRequireDefault(require("../../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose'); //--------------------------------PAGINACION DE TABLA DEFAULT 7 EN 7--------------------


var getDocentes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    //if(req.query.take==null || req.query.take==null)return;
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var usuarios = yield _User.default.find({
      typo: {
        $in: ["DOCS"]
      }
    }).skip(limit * skip - limit).limit(limit).sort({
      updatedAt: -1
    });
    var total = usuarios.length;
    var paginas = Math.ceil(total / limit);
    var coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getDocentes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //--------------------------------LISTA PARA FILTROS [DISTRIBUTIVO, ]  --------------------


exports.getDocentes = getDocentes;

var getListasDocentes = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var products = yield _User.default.find({
      typo: {
        $in: ["DOCS"]
      }
    }).lean().select({
      fullname: 1
    });
    return res.json(products);
  });

  return function getListasDocentes(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //--------------------------------OPTENEMOS UN USUARIO POR ID--------------------


exports.getListasDocentes = getListasDocentes;

var getDocenteById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var UsuariosId = mongoose.Types.ObjectId(req.params.id);
    var usuarios = yield _User.default.findById(UsuariosId);
    res.status(200).json(usuarios);
  });

  return function getDocenteById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //--------------------------------EDITAR USUARIO POR EL ID--------------------


exports.getDocenteById = getDocenteById;

var updateDocenteById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var updatedUsuarios = yield _User.default.findByIdAndUpdate(req.params.usuariosId, req.body, {
        new: true
      });
      res.status(200).json(updatedUsuarios);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function updateDocenteById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //--------------------------------ELIMINAR USUARIOS POR EL ID--------------------


exports.updateDocenteById = updateDocenteById;

var deleteDocenteById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var UsuariosId = mongoose.Types.ObjectId(req.params.id);
    yield _User.default.findByIdAndDelete(UsuariosId);
    res.status(200).json();
  });

  return function deleteDocenteById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //--------------------------------CREAR ESTUDIANTE--------------------


exports.deleteDocenteById = deleteDocenteById;

var createDocentes = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
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
        modalidad,
        fullname,
        sexo,
        fketnia,
        fknacionalidad,
        fkparroquia,
        titulo
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
        password: yield _User.default.encryptPassword(password),
        sexo,
        fketnia,
        fknacionalidad,
        fkparroquia,
        titulo
      }); // checking for roles

      var role = yield _Role.default.findOne({
        name: "Docente"
      });
      newUser.roles = [role._id];
      var savedUser = yield newUser.save();
      return res.status(200).json({
        savedUser
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createDocentes(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createDocentes = createDocentes;