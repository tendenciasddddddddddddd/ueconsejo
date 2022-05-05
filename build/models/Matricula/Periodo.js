"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var nivelSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    unique: true
  },
  inicia: String,
  finaliza: String,
  estado: {
    type: String,
    default: 1
  },
  typo: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Periodo", nivelSchema);

exports.default = _default;