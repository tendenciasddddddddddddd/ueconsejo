"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var roleSchema = new _mongoose.Schema({
  nombre: String,
  fecha: String,
  identificador: String //ID DEL CLIENTE

}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("Seccion", roleSchema);

exports.default = _default;