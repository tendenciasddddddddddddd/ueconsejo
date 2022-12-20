"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middlewares = require("../../middlewares");

var quizzCtrl = _interopRequireWildcard(require("../../controllers/AulasVirtuales/quizz.controlles"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.put("/solve/:quizzId", [_middlewares.authJwt.verifyToken], quizzCtrl.solveQuiz); //resolver examen por los estudiantes

router.put("/solve2/:quizzId", [_middlewares.authJwt.verifyToken], quizzCtrl.segundoIntentoById);
router.put("/:aulaId", [_middlewares.authJwt.verifyToken], quizzCtrl.createQuizz); //crear examen

router.put("/remove/:quizzId", [_middlewares.authJwt.verifyToken], quizzCtrl.deleteQuizzById); //eliminamos examen

router.put("/send/:quizzId", [_middlewares.authJwt.verifyToken], quizzCtrl.saveQuestionById); //crear examen options

router.put("/send2/:quizzId", [_middlewares.authJwt.verifyToken], quizzCtrl.editQuestionById); //editamos examen options

router.put("/editQuizz/:aulaId", [_middlewares.authJwt.verifyToken], quizzCtrl.editExamById); // editar el examen fecha de entrega

var _default = router;
exports.default = _default;