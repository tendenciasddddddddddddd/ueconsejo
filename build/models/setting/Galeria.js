"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var galeriaSchema = new _mongoose.Schema({
  name: String
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("Galeria", galeriaSchema);

exports.default = _default;