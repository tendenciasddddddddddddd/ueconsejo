"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var roleSchema = new _mongoose.Schema({
  inicio: String,
  fin: String
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("AperturaNotas", roleSchema);

exports.default = _default;