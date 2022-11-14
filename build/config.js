"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); //mongodb+srv://steban_wm:Medid100.@cluster0.xee5y.mongodb.net/apicolegios?retryWrites=true&w=majority
//mongodb://localhost/sistema-educativo
//mongodb+srv://steban:Medid100.@cluster0.5imedg1.mongodb.net/uemah?retryWrites=true&w=majority
//mongodb+srv://steban:Medid100.@serverlessinstance0.0l8ym.mongodb.net/uemah?retryWrites=true&w=majority
//mongodb+srv://steban:Medid100.@serverlessinstance0.0l8ym.mongodb.net/uemcma?retryWrites=true&w=majority

var _default = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://steban:Medid100.@serverlessinstance0.0l8ym.mongodb.net/uemah?retryWrites=true&w=majority",
  PORT: process.env.PORT || 3000,
  SECRET: 'uem alfonso-herrera'
};
exports.default = _default;