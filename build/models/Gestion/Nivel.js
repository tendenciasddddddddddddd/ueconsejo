"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var nivelSchema = new _mongoose.Schema({
  nombres: {
    type: String,
    required: true
  },
  modalidad: String,
  estado: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Nivel", nivelSchema);

exports.default = _default;