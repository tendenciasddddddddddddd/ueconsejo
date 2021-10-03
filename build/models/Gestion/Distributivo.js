"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var cantonesSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  icono: String,
  fnivel: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Nivel"
  },
  fdocente: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  fmateria: {
    type: _mongoose.Schema.Types.ObjectId,
    //materia
    ref: "Materia"
  },
  facademicos: {
    type: _mongoose.Schema.Types.ObjectId,
    //periodo
    ref: "Academicos"
  },
  paralelo: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Distributivo", cantonesSchema);

exports.default = _default;