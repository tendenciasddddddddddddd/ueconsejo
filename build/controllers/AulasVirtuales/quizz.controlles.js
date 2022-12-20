"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solveQuiz = exports.segundoIntentoById = exports.editExamById = exports.editQuestionById = exports.saveQuestionById = exports.deleteQuizzById = exports.createQuizz = void 0;

var _Aulavirtual = _interopRequireDefault(require("../../models/aulavirtual/Aulavirtual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//----------------------------------------------------[CREAR UNA EXAMEN [DOCENTES, ]
var createQuizz = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      yield _Aulavirtual.default.findByIdAndUpdate(req.params.aulaId, {
        $push: {
          examen: req.body.examen
        }
      }, {
        new: true
      });
      res.status(200).json(req.params.aulaId);
    } catch (e) {
      res.status(500).json("error del servidor");
    }
  });

  return function createQuizz(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //------------------------------------- ELIMINAR QUIZZ [DOCENTE, ]


exports.createQuizz = createQuizz;

var deleteQuizzById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.body;
      yield _Aulavirtual.default.updateOne({
        _id: req.params.quizzId
      }, {
        $pull: {
          examen: {
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

  return function deleteQuizzById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //------------------------------------- guardamos los examenes [DOCENTE, ]


exports.deleteQuizzById = deleteQuizzById;

var saveQuestionById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;
      yield _Aulavirtual.default.updateOne({
        "examen._id": req.params.quizzId
      }, {
        $push: {
          "examen.$.surveys": array
        }
      }, {
        new: true
      });
      res.status(200).json("crearnote");
    } catch (error) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function saveQuestionById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.saveQuestionById = saveQuestionById;

var editQuestionById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;
      yield _Aulavirtual.default.updateOne({
        "examen._id": req.params.quizzId
      }, {
        $set: {
          "examen.$.surveys": array
        }
      }, {
        new: true
      });
      res.status(200).json("crearnote");
    } catch (error) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function editQuestionById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //----------------------------------------------------EDITAR TAREA [DOCENTES, ]


exports.editQuestionById = editQuestionById;

var editExamById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.aulaId;
      var array = cadenaId.split(",");

      if (array[0] != null && array[1] != null) {
        yield _Aulavirtual.default.updateOne({
          _id: array[0]
        }, {
          $set: {
            "examen.$[perf].nombre": req.body.examen.nombre,
            "examen.$[perf].startDate": req.body.examen.startDate,
            "examen.$[perf].endDate": req.body.examen.endDate,
            "examen.$[perf].descripcion": req.body.examen.descripcion,
            //
            "examen.$[perf].time": req.body.examen.time,
            "examen.$[perf].security": req.body.examen.security,
            "examen.$[perf].intenAllowed": req.body.examen.intenAllowed
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } else {
        res.status(200).json("req.params.aulaId");
      }
    } catch (e) {
      res.status(500).json("error del servidor");
    }
  });

  return function editExamById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.editExamById = editExamById;

var segundoIntentoById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.quizzId;
      var array = cadenaId.split(",");

      if (array) {
        yield _Aulavirtual.default.updateOne({
          _id: array[0]
        }, {
          $set: {
            "examen.$[perf].answers.$[est]": req.body
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }, {
            "est._id": {
              $eq: array[2]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } else {
        res.status(200).json("req.params.aulaId");
      }
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  });

  return function segundoIntentoById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.segundoIntentoById = segundoIntentoById;

var solveQuiz = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Aulavirtual.default.updateOne({
        "examen._id": req.params.quizzId
      }, {
        $push: {
          "examen.$.answers": req.body
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

  return function solveQuiz(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.solveQuiz = solveQuiz;