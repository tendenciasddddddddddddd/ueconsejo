"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var paisesSchema = new _mongoose.Schema({
  rector: String,
  vicerector: String,
  secretario: String,
  inspector: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Configure", paisesSchema);

exports.default = _default;