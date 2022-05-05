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
  fkProvincia: String,
  //---------------TIPO MAS DATOS
  prov: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Provincias"
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Cantones", cantonesSchema);

exports.default = _default;