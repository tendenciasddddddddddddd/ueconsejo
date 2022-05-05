"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _nivel = _interopRequireDefault(require("../../controllers/Gestion/nivel.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/level", _nivel.default.getListasNiveles);
router.get("/:id", _nivel.default.getNivelById);
router.get("/", _nivel.default.getNivel);
router.put("/:nivelId", _nivel.default.updateNivelById);
router.delete("/:id", _nivel.default.deleteNivelById);
router.post("/", _nivel.default.createNivel);
router.put('/activate/:id', _nivel.default.activate);
var _default = router;
exports.default = _default;