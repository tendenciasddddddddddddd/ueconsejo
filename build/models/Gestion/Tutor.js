"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var cantonesSchema = new _mongoose.Schema({
  fnivel: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Nivel"
  },
  fdocente: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  paralelo: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Tutor", cantonesSchema);

exports.default = _default;