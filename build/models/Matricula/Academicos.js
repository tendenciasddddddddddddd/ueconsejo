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
  estado: String,
  typo: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Academicos", nivelSchema);

exports.default = _default;