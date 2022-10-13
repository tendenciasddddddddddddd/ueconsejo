"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCodigoCourse = exports.deleteTaskById = exports.updateTaskSend = exports.createTaskArbol2ById = exports.reviewTaskById = exports.calificarTaskById = exports.editTaskById = exports.createTaskById = void 0;

var _Aulavirtual = _interopRequireDefault(require("../../models/aulavirtual/Aulavirtual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//----------------------------------------------------CREAR UNA NUEVA TAREA [DOCENTES, ]
var createTaskById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      yield _Aulavirtual.default.findByIdAndUpdate(req.params.aulaId, {
        $push: {
          task: req.body.task
        }
      }, {
        new: true
      });
      res.status(200).json(req.params.aulaId);
    } catch (e) {
      res.status(500).json("error del servidor");
    }
  });

  return function createTaskById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //----------------------------------------------------EDITAR TAREA [DOCENTES, ]


exports.createTaskById = createTaskById;

var editTaskById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.aulaId;
      var array = cadenaId.split(",");

      if (array[0] != null && array[1] != null) {
        yield _Aulavirtual.default.updateOne({
          _id: array[0]
        }, {
          $set: {
            "task.$[perf].nombre": req.body.task.nombre,
            "task.$[perf].descripcion": req.body.task.descripcion,
            "task.$[perf].archivo": req.body.task.archivo,
            "task.$[perf].finicio": req.body.task.finicio
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
      console.log(e);
      res.status(500).json("error del servidor");
    }
  });

  return function editTaskById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //----------------------------------------------------CALIFICAR TAREA [DOCENTES, ]


exports.editTaskById = editTaskById;

var calificarTaskById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.aulaId;
      var array = cadenaId.split(",");

      if (array) {
        yield _Aulavirtual.default.updateOne({
          _id: array[0]
        }, {
          $set: {
            "task.$[perf].entrega.$[est].nota": req.body.nota,
            "task.$[perf].entrega.$[est].observar": req.body.observar
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
      res.status(500).json("error del servidor");
    }
  });

  return function calificarTaskById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //----------------------------------------------------MARCAR COMO TAREA REVISADA [DOCENTES, ]


exports.calificarTaskById = calificarTaskById;

var reviewTaskById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.aulaId;
      var array = cadenaId.split(",");

      if (array) {
        yield _Aulavirtual.default.updateOne({
          _id: array[0]
        }, {
          $set: {
            "task.$[perf].estado": '1'
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
      console.log(e);
      res.status(500).json("error del servidor");
    }
  });

  return function reviewTaskById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //------------------------------------- INSERTA TAREAS [ESTUDIANTES, ]


exports.reviewTaskById = reviewTaskById;

var createTaskArbol2ById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Aulavirtual.default.updateOne({
        "task._id": req.params.taskId
      }, {
        $push: {
          "task.$.entrega": req.body
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

  return function createTaskArbol2ById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //----EDITAMOS LA ENTREGA DE TAREAS POR PARTE DE OS ESTUDIANTES


exports.createTaskArbol2ById = createTaskArbol2ById;

var updateTaskSend = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.taskId;
      var array = cadenaId.split(",");

      if (array) {
        yield _Aulavirtual.default.updateOne({
          _id: array[0]
        }, {
          $set: {
            "task.$[perf].entrega.$[est].link": req.body.link,
            "task.$[perf].entrega.$[est].comentario": req.body.comentario
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

  return function updateTaskSend(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //------------------------------------- ELIMINAR TAREAS [DOCENTE, ]


exports.updateTaskSend = updateTaskSend;

var deleteTaskById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.body;
      yield _Aulavirtual.default.updateOne({
        _id: req.params.taskId
      }, {
        $pull: {
          task: {
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

  return function deleteTaskById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteTaskById = deleteTaskById;

var updateCodigoCourse = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    var updatedProduct = yield _Aulavirtual.default.findByIdAndUpdate(req.params.aulaId, req.body, {
      new: true
    });
    res.status(200).json(updatedProduct);
  });

  return function updateCodigoCourse(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.updateCodigoCourse = updateCodigoCourse;