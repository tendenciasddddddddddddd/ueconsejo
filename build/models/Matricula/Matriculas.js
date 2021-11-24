"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var nivelSchema = new _mongoose.Schema({
  fecha: {
    type: String,
    required: true
  },
  fkestudiante: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  nombre: String,
  fknivel: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Nivel"
  },
  academico: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Academicos"
  },
  nmatricula: Number,
  folio: Number,
  curso: String,
  estado: String,
  typo: String,
  //--------------------------REFORMAR CALIFICACIONES
  calificaciones: [{
    docente: String,
    materia: String,
    sumaf: String,
    promediof: String,
    notas: [{
      quimestre: String,
      promedio: String,
      examen: String,
      arraysNote: String
    }]
  }],
  asistencias: [{
    fecha: String,
    materia: String,
    isAsiste: String
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Matriculas", nivelSchema);

exports.default = _default;