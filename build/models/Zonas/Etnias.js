"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var etniasSchema = new _mongoose.Schema({
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

var _default = (0, _mongoose.model)("Etnias", etniasSchema);

exports.default = _default;