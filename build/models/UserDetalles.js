"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var cantonesSchema = new _mongoose.Schema({
  // ---------------bloque1
  telefonofijo: String,
  calles: String,
  referencia: String,
  codigo: String,
  numeric: String,
  nombrec: String,
  edad: String,
  nacimineto: String,
  //---------------bloque2
  centroAtencio: String,
  estadoEstudiant: String,
  tipoDocumnt: String,
  estadoCivi: String,
  tiposangre: String,
  operado: String,
  carnet: String,
  parentesc: String,
  discapacidad: String,
  //---------------TIPO MAS DATOS
  detalles: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("UserDetalles", cantonesSchema);

exports.default = _default;