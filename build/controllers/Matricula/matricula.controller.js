"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatriculasNotaBykEY = exports.deleteMatriculasById = exports.updateMatriculasById = exports.getMatriculasById = exports.getMatriculaFolio = exports.getListaMatricula = exports.getInfoMat = exports.getReportes = exports.getMatriculas = exports.createMatriculas = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matricula/Matriculas"));

var _Nivel = _interopRequireDefault(require("../../models/Gestion/Nivel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createMatriculas = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      fecha,
      fkestudiante,
      fknivel,
      nmatricula,
      nombre,
      folio,
      curso,
      estado,
      typo,
      academico
    } = req.body;

    try {
      var newPeriodo = new _Matriculas.default({
        fecha,
        fkestudiante,
        fknivel,
        nmatricula,
        nombre,
        folio,
        curso,
        estado,
        typo,
        academico
      });
      var PeriodoSaved = yield newPeriodo.save();
      res.status(201).json(PeriodoSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createMatriculas(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createMatriculas = createMatriculas;

var getMatriculas = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    //SIRVE EL LISTADO PARA [CONSOLIDADO, ]
    var matriculas = yield _Matriculas.default.find().lean().select({
      curso: 1,
      typo: 1
    }).populate('fkestudiante', 'fullname cedula email fkparroquia sexo').populate('fknivel', 'nombres');
    return res.json(matriculas);
  });

  return function getMatriculas(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMatriculas = getMatriculas;

var getReportes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    //RESUELVE LOS REPORTES
    var version = req.query.m;
    var curs = req.query.c;
    var matriculas = yield _Matriculas.default.find({
      typo: {
        $in: [version]
      },
      fknivel: {
        $in: [curs]
      }
    }).lean().select({
      curso: 1,
      nombre: 1
    });
    return res.json(matriculas);
  });

  return function getReportes(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getReportes = getReportes;

var getInfoMat = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    //NO RESULEV NADA
    if (req.query.h) {
      var academic = req.query.h;
      var version = req.query.m;
      var curs = req.query.c;
      var matriz = yield _Matriculas.default.find({
        academico: {
          $in: [academic]
        },
        typo: {
          $in: [version]
        },
        fknivel: {
          $in: [curs]
        }
      }).populate('fkestudiante', 'nombres apellidos foto').populate('fknivel', 'nombres');
      console.log('entro 1 ');
      var _coleccion = {
        matriculados: matriz
      };
      return res.json(_coleccion);
    }

    var modalidad = req.query.v; // Asegúrate de parsear el límite a número

    var periodo = req.query.p;
    var mat = yield _Matriculas.default.findOne({
      typo: {
        $in: [modalidad]
      },
      estado: {
        $in: ["1"]
      },
      academico: {
        $in: [periodo]
      }
    }).sort({
      createdAt: -1
    });
    var coleccion = {
      num: 1,
      infor: mat
    };
    return res.json(coleccion);
  });

  return function getInfoMat(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getInfoMat = getInfoMat;

var getListaMatricula = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    //RESUELVE LISTA DE MATRICULA [ELIMINAR, PARALELOS]
    var curso = req.query.curso;
    var mat = yield _Matriculas.default.find({
      fknivel: {
        $in: [curso]
      }
    }).select({
      curso: 1,
      nombre: 1
    }).populate('fknivel', 'nombres');
    var coleccion = {
      matriculados: mat
    };
    return res.json(coleccion);
  });

  return function getListaMatricula(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getListaMatricula = getListaMatricula;

var getMatriculaFolio = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    //RESUELVE NUMERO DE MATRICULA Y FOLIO
    var modalidad = req.query.v;
    var mat = yield _Matriculas.default.findOne({
      typo: {
        $in: [modalidad]
      }
    }).sort({
      createdAt: -1
    });
    var coleccion = {
      num: 1,
      infor: mat
    };
    return res.json(coleccion);
  });

  return function getMatriculaFolio(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getMatriculaFolio = getMatriculaFolio;

var getMatriculasById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var {
      matriculaId
    } = req.params;
    var niveles = yield _Matriculas.default.findById(matriculaId).populate('fknivel', 'nombres').populate('academico', 'nombre');
    res.status(200).json(niveles);
  });

  return function getMatriculasById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //-----------------------------------------------------------PARALELOS [ADMINISTRADOR]


exports.getMatriculasById = getMatriculasById;

var updateMatriculasById = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.matriculaId;
      var array = cadenaId.split(",");
      var updatedMateria = yield _Matriculas.default.updateMany({
        _id: {
          $in: array
        }
      }, req.body, {
        new: true
      });
      res.status(200).json(updatedMateria);
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function updateMatriculasById(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //-----------------------------------------------------------ELIMINAR MATRICULA CON MULTIPLES


exports.updateMatriculasById = updateMatriculasById;

var deleteMatriculasById = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Matriculas.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteMatriculasById(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}(); //--------------------------------REPORTE DE ESTUDIANTES-----------------------------------


exports.deleteMatriculasById = deleteMatriculasById;

var getMatriculasNotaBykEY = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
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

  return function getMatriculasNotaBykEY(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getMatriculasNotaBykEY = getMatriculasNotaBykEY;