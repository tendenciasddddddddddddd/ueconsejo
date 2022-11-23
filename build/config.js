"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); //mongodb://localhost/sistema-educativo
//mongodb+srv://steban:Medid100.@serverlessinstance0.0l8ym.mongodb.net/uehuaca?retryWrites=true&w=majority

var _default = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://steban:Medid100.@serverlessinstance0.0l8ym.mongodb.net/uehuaca?retryWrites=true&w=majority",
  PORT: process.env.PORT || 4000,
  SECRET: 'unidad-educativa-huaca'
};
exports.default = _default;