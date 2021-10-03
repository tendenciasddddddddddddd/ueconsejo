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
  estado: String,
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