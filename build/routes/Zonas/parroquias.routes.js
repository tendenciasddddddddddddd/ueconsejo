"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var parroquiaCtrl = _interopRequireWildcard(require("../../controllers/Zonas/parroquias.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.get("/newcant", parroquiaCtrl.getlistaCantones);
router.get("/query", parroquiaCtrl.query);
router.get("/:parroquiasId", parroquiaCtrl.getParroquiasById);
router.get("/", parroquiaCtrl.getParroquias);
router.post("/", parroquiaCtrl.createParroquias);
router.put("/:parroquiasId", parroquiaCtrl.updateParroquiasById);
router.delete("/:id", parroquiaCtrl.deleteParroquiasById);
router.put('/activate/:id', parroquiaCtrl.activate);
var _default = router;
exports.default = _default;