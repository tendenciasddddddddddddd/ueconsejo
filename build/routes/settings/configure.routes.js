"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var Ctrl = _interopRequireWildcard(require("../../controllers/setting/configure.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.put("/apps/:Id", [_middlewares.authJwt.verifyToken], Ctrl.updatAplicacionesById);
router.put("/apertura/:Id", [_middlewares.authJwt.verifyToken], Ctrl.updatAperturaById);
router.put("/:Id", [_middlewares.authJwt.verifyToken], Ctrl.updateConfigureById);
router.get("/apps/", [_middlewares.authJwt.verifyToken], Ctrl.getAplicaciones);
router.get("/apertura/", [_middlewares.authJwt.verifyToken], Ctrl.getApertura);
router.get("/", [_middlewares.authJwt.verifyToken], Ctrl.getConfigure);
var _default = router;
exports.default = _default;