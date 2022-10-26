"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmFullNoteById = exports.deleteNoteById = exports.createFullProyectos = exports.createFullComportamiento = exports.createFullSupletorios = exports.createFullNote = exports.createNotaArbol3ById = exports.createNotaArbol2ById = exports.createNotaArbol1ById = exports.getMatriculasNotaById = exports.getMatriculaAsistencia = exports.getMatriculaNota = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matricula/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//---------------------------------------------------------SIRVE LISTA DE ESTUDIANTES A CALIFICAR [DOCENTES, ]
var getMatriculaNota = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var idCurso = req.query.curso;
      var distributivo = yield _Matriculas.default.find({
        fknivel: {
          $in: [idCurso]
        }
      }, {
        'curso': 1,
        'nombre': 1,
        'calificaciones': 1
      }) //aqui se produjo el error de 
      .lean();
      return res.json(distributivo);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getMatriculaNota(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //---------------------------------------------------------ASUGNAR ASISTENCIAS  [DOCENTES, ]


exports.getMatriculaNota = getMatriculaNota;

var getMatriculaAsistencia = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var idCurso = req.query.curso;
      var distributivo = yield _Matriculas.default.find({
        fknivel: {
          $in: [idCurso]
        }
      }).lean().select({
        curso: 1,
        nombre: 1
      });
      return res.json(distributivo);
    } catch (error) {
      return res.status(500).json();
    }
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
      }).populate('fknivel', 'nombre').populate('academico', 'nombre');
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
}(); //-------------------------------------------------------REFORMA DE CALIFICACIONES RESUELVE [DOCENTE, ]-------------------------------------


exports.getMatriculasNotaById = getMatriculasNotaById;

var createNotaArbol1ById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.matriculaId;
      var array = cadenaId.split(",");
      yield _Matriculas.default.updateMany({
        _id: {
          $in: array
        }
      }, {
        $push: {
          'calificaciones': req.body.calificaciones
        }
      }, {
        new: true
      });
      res.status(200).json('crearnote');
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function createNotaArbol1ById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //------------------------------------- INSERTA LAS NOTAS-------------------------------------


exports.createNotaArbol1ById = createNotaArbol1ById;

var createNotaArbol2ById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Matriculas.default.updateOne({
        _id: req.params.matriculaId,
        'calificaciones._id': req.body.calificaciones._id
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
    try {
      yield _Matriculas.default.updateOne({
        _id: req.params.matriculaId,
        'calificaciones._id': req.body.calificaciones._id
      }, {
        $set: {
          'calificaciones.$.promediof': req.body.calificaciones.promediof
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

  return function createNotaArbol3ById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //----------------CGRABAR NOTAS DE FORMA MASIVA [DOCENTES, ]


exports.createNotaArbol3ById = createNotaArbol3ById;

var createFullNote = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.notas': array[i].notas,
            'calificaciones.$.promediof': array[i].promediof
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullNote(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //----------------CGRABAR NOTAS DE FORMA MASIVA [DOCENTES, ] PARA SUPLETORIOS


exports.createFullNote = createFullNote;

var createFullSupletorios = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.suple': array[i].suple,
            'calificaciones.$.reme': array[i].reme,
            'calificaciones.$.gracia': array[i].gracia,
            'calificaciones.$.pfinal': array[i].pfinal
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullSupletorios(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.createFullSupletorios = createFullSupletorios;

var createFullComportamiento = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.comportamiento': array[i].comportamiento
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullComportamiento(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createFullComportamiento = createFullComportamiento;

var createFullProyectos = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.proyectos': array[i].proyectos
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullProyectos(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}(); //------------------------------------- ELIMINAR NOTAS [DOCENTE, ]


exports.createFullProyectos = createFullProyectos;

var deleteNoteById = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.notas': []
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function deleteNoteById(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}(); //------------------------------------CONFIRMAR NOTAS [DOCENTE, ]


exports.deleteNoteById = deleteNoteById;

var confirmFullNoteById = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id
        }, {
          $set: {
            "calificaciones.$[perf].promediof": array[i].promedio
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[i].fora
            }
          }],
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function confirmFullNoteById(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.confirmFullNoteById = confirmFullNoteById;