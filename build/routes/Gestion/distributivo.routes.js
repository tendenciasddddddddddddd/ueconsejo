"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var Ctr = _interopRequireWildcard(require("../../controllers/Gestion/distributivo.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();

var {
  cacheInit
} = require("../../middlewares/cache");

router.get("/nuedist", [_middlewares.authJwt.verifyToken], Ctr.getInfoDistributivo);
router.get("/clearData", [_middlewares.authJwt.verifyToken], Ctr.getClearDistributivo);
router.get("/fulldistributivo", [_middlewares.authJwt.verifyToken], Ctr.getAllDistributivo);
router.get("/estadistica", [_middlewares.authJwt.verifyToken], Ctr.getForEstadistica);
router.get("/planificacio/:distributivoId", [_middlewares.authJwt.verifyToken], Ctr.getPlanificacionById);
router.get("/:distributivoId", [_middlewares.authJwt.verifyToken], Ctr.getDistributivoById);
router.post("/many/", [_middlewares.authJwt.verifyToken], Ctr.createArrayDistributivo);
router.get("/", [_middlewares.authJwt.verifyToken], Ctr.getDistributivo);
router.put("/planificacion/:distributivoId", [_middlewares.authJwt.verifyToken], Ctr.updatePlanificacionById); //router.put("/removemateria/:distributivoId",[authJwt.verifyToken], Ctr.deleteMateriaById); //EDITARMOS DATOS DE LA TAREA

router.put("/:distributivoId", [_middlewares.authJwt.verifyToken], Ctr.deletePlanificacion);
var _default = router;
exports.default = _default;