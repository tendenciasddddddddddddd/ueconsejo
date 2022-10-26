"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = exports.createEstudianteMany = exports.createEstudiante = exports.deleteEstudianteById = exports.updateEstudianteById = exports.getEstudianteById = exports.getListasEstudiantes = exports.getBuscadorUsuarios = exports.getEstudiantes = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _Role = _interopRequireDefault(require("../../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getEstudiantes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var limit = parseInt(req.query.take);
      var skip = parseInt(req.query.page);
      var total = yield _User.default.countDocuments({
        typo: {
          $in: ["ESTS"]
        }
      });
      var paginas = Math.ceil(total / limit);
      var usuarios = yield _User.default.find({
        typo: {
          $in: ["ESTS"]
        }
      }).skip(limit * skip - limit).limit(limit).sort({
        updatedAt: -1
      });
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

  return function getEstudiantes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getEstudiantes = getEstudiantes;

var getBuscadorUsuarios = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var usuarios = yield _User.default.find({
        typo: {
          $in: ["ESTS"]
        }
      }).lean().select({
        fullname: 1,
        foto: 1,
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
}(); //--------------------------------LISTA PARA FILTROS [MATRICULAS, ]  --------------------


exports.getBuscadorUsuarios = getBuscadorUsuarios;

var getListasEstudiantes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var products = yield _User.default.find({
        typo: {
          $in: ["ESTS"]
        }
      }).lean().select({
        fullname: 1,
        foto: 1,
        cedula: 1,
        status: 1
      });
      return res.json(products);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getListasEstudiantes(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //--------------------------------OPTENEMOS UN USUARIO POR ID--------------------


exports.getListasEstudiantes = getListasEstudiantes;

var getEstudianteById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id
      } = req.params;
      var usuarios = yield _User.default.findById(id);
      res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getEstudianteById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //--------------------------------EDITAR USUARIO POR EL ID--------------------


exports.getEstudianteById = getEstudianteById;

var updateEstudianteById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var updatedUsuarios = yield _User.default.findByIdAndUpdate(req.params.usuariosId, req.body, {
        new: true
      });
      res.status(200).json(updatedUsuarios);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function updateEstudianteById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //--------------------------------ELIMINAR USUARIOS POR EL ID--------------------


exports.updateEstudianteById = updateEstudianteById;

var deleteEstudianteById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
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

  return function deleteEstudianteById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //--------------------------------CREAR ESTUDIANTE--------------------


exports.deleteEstudianteById = deleteEstudianteById;

var createEstudiante = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
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
        fullname,
        sexo,
        fketnia,
        fknacionalidad,
        fkparroquia
      } = req.body;
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
        fkparroquia
      });
      var role = yield _Role.default.findOne({
        name: "Estudiante"
      });
      newUser.roles = [role._id];
      var savedUser = yield newUser.save();
      return res.status(200).json({
        savedUser
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Problem'
      });
    }
  });

  return function createEstudiante(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //--------------------------------CREAR ESTUDIANTE--------------------


exports.createEstudiante = createEstudiante;

var createEstudianteMany = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    var roles = req.query.role;

    try {
      var array = req.body;
      var docs = [];
      var duplicados = [];
      var role = yield _Role.default.findOne({
        name: roles
      });

      for (var i = 0; i < array.length; i++) {
        var ifcedula = yield _User.default.findOne({
          cedula: array[i].cedula
        });

        if (ifcedula) {
          duplicados.push(array[i]);
        } else {
          array[i].password = yield _User.default.encryptPassword(array[i].password);
          array[i].roles = [role._id];
          docs.push(array[i]);
        }
      }

      if (docs) {
        var options = {
          ordered: false
        };
        yield _User.default.insertMany(docs, options);
      }

      return res.status(200).json({
        duplicados
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Problem'
      });
    }
  });

  return function createEstudianteMany(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.createEstudianteMany = createEstudianteMany;

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
          $in: ["ESTS"]
        }
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
    }
  });

  return function query(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.query = query;