"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTaskById = exports.createTaskArbol2ById = exports.editTaskById = exports.createTaskById = void 0;

var _Aulavirtual = _interopRequireDefault(require("../../models/aulavirtual/Aulavirtual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId; //----------------------------------------------------CREAR UNA NUEVA TAREA [DOCENTES, ]

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
          _id: array[0],
          "task._id": array[1]
        }, {
          $set: {
            "task.$": req.body.task
          }
        }, {
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
}(); //------------------------------------- INSERTA TAREAS [ESTUDIANTES, ]


exports.editTaskById = editTaskById;

var createTaskArbol2ById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      console.log(req.body);
      yield _Aulavirtual.default.updateOne({
        "task._id": req.params.taskId
      }, {
        $push: {
          "task.$.entrega": req.body.task.entrega
        }
      }, {
        new: true
      });
      res.status(200).json("crearnote");
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createTaskArbol2ById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //------------------------------------- ELIMINAR TAREAS [DOCENTE, ]


exports.createTaskArbol2ById = createTaskArbol2ById;

var deleteTaskById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
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

  return function deleteTaskById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteTaskById = deleteTaskById;