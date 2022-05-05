"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var cantonesSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    unique: true
  },
  estado: {
    type: String,
    default: 1
  },
  fkCanton: String,
  //---------------TIPO MAS DATOS
  cant: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Cantones"
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Parroquias", cantonesSchema);

exports.default = _default;