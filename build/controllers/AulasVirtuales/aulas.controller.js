"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserById = exports.createAulaById = exports.getAllAulasEstu = exports.getAulassById = exports.getAulasMainById = exports.deleteAulaById = exports.getAulasVirtuales = exports.createAulasVirtuales = void 0;

var _Aulavirtual = _interopRequireDefault(require("../../models/aulavirtual/Aulavirtual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createAulasVirtuales = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      fecha,
      fdocente,
      doc,
      nombre,
      materia,
      codigo,
      descripcion,
      icono
    } = req.body;

    try {
      var newAula = new _Aulavirtual.default({
        fecha,
        fdocente,
        doc,
        nombre,
        materia,
        codigo,
        descripcion,
        icono
      });
      var AulaSaved = yield newAula.save();
      res.status(201).json(AulaSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createAulasVirtuales(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //----------------------------RESULEVE LISTA DE CURSOS EN [DOCENTES]


exports.createAulasVirtuales = createAulasVirtuales;

var getAulasVirtuales = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var idDocente = req.query.id;
      var matriculas = yield _Aulavirtual.default.find({
        fdocente: {
          $in: [idDocente]
        }
      }).lean().select({
        nombre: 1,
        materia: 1,
        icono: 1,
        fecha: 1
      });
      return res.json(matriculas);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getAulasVirtuales(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //----------------------------ELIMINAR AULAS VIRTUALES [DOCENTES]


exports.getAulasVirtuales = getAulasVirtuales;

var deleteAulaById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.aulaId;
      var array = cadenaId.split(",");
      yield _Aulavirtual.default.deleteMany({
        _id: {
          $in: array
        }
      }); // code 200 is ok too

      res.status(200).json();
    } catch (error) {
      res.status(500).json('error del servidor');
    }
  });

  return function deleteAulaById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //TRAEMOS AULA SOLO EN NOMBRE RESUELVE [DOCENTE => AULA-PRINCIPAL]


exports.deleteAulaById = deleteAulaById;

var getAulasMainById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        aulaId
      } = req.params;
      var aulas = yield _Aulavirtual.default.findById(aulaId).lean().select({
        materia: 1,
        nombre: 1,
        estudiantes: 1
      });
      res.status(200).json(aulas);
    } catch (err) {
      res.status(500).json('error del servidor');
    }
  });

  return function getAulasMainById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //TRAEMOS AULA PARA EL DOCENTES


exports.getAulasMainById = getAulasMainById;

var getAulassById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        aulaId
      } = req.params;
      var aulas = yield _Aulavirtual.default.findById(aulaId).lean();
      res.status(200).json(aulas);
    } catch (err) {
      res.status(500).json('error del servidor');
    }
  });

  return function getAulassById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //PARA MATRICULA DE ESTUDIANTES OSEA TRE PARA QUE SE MATRICULE 


exports.getAulassById = getAulassById;

var getAllAulasEstu = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var matriculas = yield _Aulavirtual.default.find().lean().select({
        nombre: 1,
        materia: 1,
        doc: 1,
        codigo: 1,
        estudiantes: 1,
        icono: 1,
        fecha: 1
      });
      return res.json(matriculas);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getAllAulasEstu(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //EMPUJAR USUARIO O ESTUDIANTE A CADA AARREGLO


exports.getAllAulasEstu = getAllAulasEstu;

var createAulaById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Aulavirtual.default.findByIdAndUpdate(req.params.aulaId, {
        $push: {
          'estudiantes': req.body.estudiantes
        }
      }, {
        new: true
      });
      res.status(200).json(req.params.aulaId);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createAulaById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //------------------------------------- ELIMINAR ESTUDIANTES DEL CURSO [DOCENTE, ]


exports.createAulaById = createAulaById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.body;
      yield _Aulavirtual.default.updateOne({
        _id: req.params.taskId
      }, {
        $pull: {
          estudiantes: {
            _id: cadenaId
          }
        }
      }, {
        new: true
      });
      res.status(200).json("crearnote");
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function deleteUserById(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;