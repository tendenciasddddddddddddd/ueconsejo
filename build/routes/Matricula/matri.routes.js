"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var matriCtrl = _interopRequireWildcard(require("../../controllers/Matricula/matricula.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
//ConsultarMatriculaFolio
router.get("/datas/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculasNotaBykEY); //RUTA PARA CONSULTAR NUM MATRICULA Y FOLIO

router.get("/consult", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculaFolio); //RUTA PARA CONSULTAR NUM MATRICULA Y FOLIO

router.get("/fullmatricula", [_middlewares.authJwt.verifyToken], matriCtrl.getListaMatricula); //RUTA DE CONSULTA TODOS LOS MATRICULADOS

router.get("/queryMatricula", [_middlewares.authJwt.verifyToken], matriCtrl.getQueryAll);
router.get("/report", [_middlewares.authJwt.verifyToken], matriCtrl.getReportes);
router.get("/repo/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculaByIdReport);
router.get("/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculasById);
router.get("/", [_middlewares.authJwt.verifyToken], matriCtrl.getMatriculas);
router.post("/", [_middlewares.authJwt.verifyToken], matriCtrl.createMatriculas);
router.put("/:matriculaId", [_middlewares.authJwt.verifyToken], matriCtrl.updateMatriculasById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], matriCtrl.deleteMatriculasById);
var _default = router;
exports.default = _default;