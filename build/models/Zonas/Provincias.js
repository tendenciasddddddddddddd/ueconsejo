"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var provinciasSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    unique: true
  },
  estado: {
    type: String,
    default: 1
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Provincias", provinciasSchema);

exports.default = _default;