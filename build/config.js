"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); //mongodb+srv://steban_wm:Medid100.@cluster0.xee5y.mongodb.net/apicolegios?retryWrites=true&w=majority
//mongodb://localhost/apicompany //sistema-educativo

var _default = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/sistema-educativo",
  PORT: process.env.PORT || 3000,
  SECRET: 'uem cesar anotonio mosquera'
};
exports.default = _default;