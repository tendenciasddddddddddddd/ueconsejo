"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNotaArbol3ById = exports.createNotaArbol2ById = exports.createNotaArbol1ById = exports.getMatriculasNotaById = exports.getMatriculaAsistencia = exports.getMatriculaNota = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matricula/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//---------------------------------------------------------SIRVE LISTA DE ESTUDIANTES A CALIFICAR [DOCENTES, ]
var getMatriculaNota = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var idCurso = req.query.curso;
    var distributivo = yield _Matriculas.default.find({
      fknivel: {
        $in: [idCurso]
      }
    }, {
      'curso': 1,
      'nombre': 1,
      'calificaciones.materia': 1,
      'calificaciones.notas.promedio': 1,
      'calificaciones.notas.quimestre': 1,
      'calificaciones.promediof': 1,
      'calificaciones._id': 1
    }) //aqui se produjo el error de 
    .lean();
    return res.json(distributivo);
  });

  return function getMatriculaNota(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //---------------------------------------------------------ASUGNAR ASISTENCIAS  [DOCENTES, ]


exports.getMatriculaNota = getMatriculaNota;

var getMatriculaAsistencia = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var idCurso = req.query.curso;
    var distributivo = yield _Matriculas.default.find({
      fknivel: {
        $in: [idCurso]
      }
    }).select({
      curso: 1,
      nombre: 1
    });
    return res.json(distributivo);
  });

  return function getMatriculaAsistencia(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //---------------------------------------------------------REVISAR NOTAS DE CADA ESTUSIANTES [ESTUDIANTES, ]  


exports.getMatriculaAsistencia = getMatriculaAsistencia;

var getMatriculasNotaById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        matriculaId
      } = req.params;
      var matricula = yield _Matriculas.default.findOne({
        fkestudiante: matriculaId
      }).populate('fknivel', 'nombres').populate('academico', 'nombre');
      res.status(200).json(matricula);
    } catch (error) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function getMatriculasNotaById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //-------------------------------------------------------REFORMA DE CALIFICACIONES -------------------------------------


exports.getMatriculasNotaById = getMatriculasNotaById;

var createNotaArbol1ById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    yield _Matriculas.default.findByIdAndUpdate(req.params.matriculaId, {
      $push: {
        'calificaciones': req.body.calificaciones
      }
    }, {
      new: true
    });
    res.status(200).json('crearnote');
  });

  return function createNotaArbol1ById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //------------------------------------- INSERTA LAS NOTAS


exports.createNotaArbol1ById = createNotaArbol1ById;

var createNotaArbol2ById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Matriculas.default.updateOne({
        'calificaciones._id': req.params.matriculaId
      }, {
        $push: {
          'calificaciones.$.notas': req.body.calificaciones.notas
        }
      }, {
        new: true
      });
      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createNotaArbol2ById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //confirmar las notas---


exports.createNotaArbol2ById = createNotaArbol2ById;

var createNotaArbol3ById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    console.log(req.body.calificaciones.promediof);

    try {
      yield _Matriculas.default.updateOne({
        'calificaciones._id': req.params.matriculaId
      }, {
        $set: {
          'calificaciones.$.promediof': req.body.calificaciones.promediof
        }
      }, {
        new: true
      });
      res.status(200).json('crearnote');
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createNotaArbol3ById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createNotaArbol3ById = createNotaArbol3ById;