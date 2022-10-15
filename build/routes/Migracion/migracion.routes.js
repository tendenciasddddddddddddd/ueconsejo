"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var migracionCtrl = _interopRequireWildcard(require("../../controllers/Migraciones/migracion.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.get("/query", [_middlewares.authJwt.verifyToken], migracionCtrl.query);
router.get("/search", [_middlewares.authJwt.verifyToken], migracionCtrl.getByIdOfCourseAndPeriod);
router.get("/clon", [_middlewares.authJwt.verifyToken], migracionCtrl.getByIdOfPeriodo);
router.get("/", [_middlewares.authJwt.verifyToken], migracionCtrl.getQueryAll);
router.post("/matricula", [_middlewares.authJwt.verifyToken], migracionCtrl.createMigracionMatricula);
router.delete("/matricula", [_middlewares.authJwt.verifyToken], migracionCtrl.deleteMatriculasMany);
router.delete("/:id", [_middlewares.authJwt.verifyToken], migracionCtrl.deleteMigracionesById);
var _default = router;
exports.default = _default;