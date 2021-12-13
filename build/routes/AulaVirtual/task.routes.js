"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var taskCtrl = _interopRequireWildcard(require("../../controllers/AulasVirtuales/task.controller"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.put("/send/:taskId", taskCtrl.createTaskArbol2ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/removetask/:taskId", taskCtrl.deleteTaskById); //EDITARMOS DATOS DE LA TAREA

router.put("/editTask/:aulaId", taskCtrl.editTaskById); // EDITA NO SE PARA QUE A

router.put("/calificarTask/:aulaId", taskCtrl.calificarTaskById); // CALIFICAR TAREA [DOCENTES,]

router.put("/reviewTask/:aulaId", taskCtrl.reviewTaskById); // CALIFICAR TAREA [DOCENTES,]

router.put("/:aulaId", taskCtrl.createTaskById); //RUTA CREAR NUEVA TAREAS DE DOCENTES

var _default = router;
exports.default = _default;