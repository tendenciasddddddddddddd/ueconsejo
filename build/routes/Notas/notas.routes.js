"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var matriCtrl = _interopRequireWildcard(require("../../controllers/Notas/notas.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.get("/list", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculaNota); //OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/asistencia", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculaAsistencia); //OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/nota/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculasNotaById); //OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.put("/reform/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.createNotaArbol1ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/ref2/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.createNotaArbol2ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/ref3/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.createNotaArbol3ById); //CONFIRMAR LAS NORAS DE ESTUDIANTES

var _default = router;
exports.default = _default;