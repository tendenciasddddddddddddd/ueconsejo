"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var paisesSchema = new _mongoose.Schema({
  nombre: String,
  estado: Boolean
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Paises", paisesSchema);

exports.default = _default;