"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryAll = exports.getMatriculasNotaBykEY = exports.deleteMatriculasById = exports.updateMatriculasById = exports.getMatriculaByIdReport = exports.getMatriculasById = exports.getMatriculaFolio = exports.getListaMatricula = exports.getInfoMat = exports.getReportes = exports.getMatriculas = exports.createMatriculas = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matricula/Matriculas"));

var _Nivel = _interopRequireDefault(require("../../models/Gestion/Nivel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createMatriculas = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;
      var docs = [];
      var duplicados = [];
      var contador = 0;
      var aux = 0;
      var ultimaMatricula = yield _Matriculas.default.findOne().sort({
        $natural: -1
      });
      var resultUltimaMatricula = 0;

      if (ultimaMatricula) {
        resultUltimaMatricula = parseInt(ultimaMatricula.nmatricula);
      }

      for (var i = 0; i < array.length; i++) {
        var ifmatricula = yield _Matriculas.default.findOne({
          // academico: array[i].academico,
          fkestudiante: array[i].fkestudiante
        });

        if (ifmatricula) {
          duplicados.push(array[i]);
        } else {
          contador++;
          aux = resultUltimaMatricula + contador;
          array[i].nmatricula = aux;
          array[i].folio = Math.ceil(aux / 2);
          docs.push(array[i]);
        }
      }

      if (docs) {
        var options = {
          ordered: false
        };
        yield _Matriculas.default.insertMany(docs, options);
      }

      return res.status(200).json({
        duplicados
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Problem"
      });
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
    }).populate("fkestudiante", "fullname cedula email fkparroquia sexo").populate("fknivel", "nombre");
    return res.json(matriculas);
  });

  return function getMatriculas(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMatriculas = getMatriculas;

var getReportes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var curs = req.query.c;
    var matriculas = yield _Matriculas.default.find({
      fknivel: {
        $in: [curs]
      }
    }).lean().select({
      curso: 1,
      nombre: 1,
      fecha: 1
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
      var curs = req.query.c;
      var matriz = yield _Matriculas.default.find({
        academico: {
          $in: [academic]
        },
        fknivel: {
          $in: [curs]
        }
      }).populate("fkestudiante", "nombre apellidos foto").populate("fknivel", "nombre");
      var _coleccion = {
        matriculados: matriz
      };
      return res.json(_coleccion);
    }

    var periodo = req.query.p;
    var mat = yield _Matriculas.default.findOne({
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
    try {
      var curso = req.query.curso;
      var mat = yield _Matriculas.default.find({
        fknivel: {
          $in: [curso]
        }
      }).lean().select({
        curso: 1,
        nombre: 1,
        fecha: 1
      });
      var coleccion = {
        matriculados: mat
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getListaMatricula(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getListaMatricula = getListaMatricula;

var getMatriculaFolio = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    //RESUELVE NUMERO DE MATRICULA Y FOLIO
    var mat = yield _Matriculas.default.findOne().sort({
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
    var niveles = yield _Matriculas.default.findById(matriculaId).populate("fknivel", {
      nombre: 1,
      area: 1
    }).populate("academico", "nombre");
    res.status(200).json(niveles);
  });

  return function getMatriculasById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getMatriculasById = getMatriculasById;

var getMatriculaByIdReport = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var result = [];
      var cadenaId = req.params ? req.params.matriculaId : '1';
      var array = cadenaId.split(",");

      if (array != '') {
        for (var i = 0; i < array.length; i++) {
          var niveles = yield _Matriculas.default.findById(array[i]).populate("fknivel", "nombre").populate("academico", "nombre");
          result.push(niveles);
        }
      }

      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getMatriculaByIdReport(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //-----------------------------------------------------------PARALELOS [ADMINISTRADOR]


exports.getMatriculaByIdReport = getMatriculaByIdReport;

var updateMatriculasById = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
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

  return function updateMatriculasById(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}(); //-----------------------------------------------------------ELIMINAR MATRICULA CON MULTIPLES


exports.updateMatriculasById = updateMatriculasById;

var deleteMatriculasById = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
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

  return function deleteMatriculasById(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}(); //--------------------------------REPORTE DE ESTUDIANTES-----------------------------------


exports.deleteMatriculasById = deleteMatriculasById;

var getMatriculasNotaBykEY = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        matriculaId
      } = req.params;
      var matricula = yield _Matriculas.default.findOne({
        fkestudiante: matriculaId
      }).populate("fknivel", "nombre").populate("academico", "nombre");
      res.status(200).json(matricula);
    } catch (error) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function getMatriculasNotaBykEY(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getMatriculasNotaBykEY = getMatriculasNotaBykEY;

var getQueryAll = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(function* (req, res) {
    var matriculas = yield _Matriculas.default.find({}).lean().select({
      curso: 1,
      nombre: 1,
      fecha: 1,
      typo: 1,
      fknivel: 1
    });
    var coleccion = {
      data: matriculas
    };
    return res.json(coleccion);
  });

  return function getQueryAll(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getQueryAll = getQueryAll;