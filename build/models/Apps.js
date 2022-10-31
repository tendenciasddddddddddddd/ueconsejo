"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var paisesSchema = new _mongoose.Schema({
  web: String,
  movil: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Apps", paisesSchema);

exports.default = _default;