import { Router } from "express";
const router = Router();
import { authJwt } from "../../middlewares";

import * as quizzCtrl from "../../controllers/AulasVirtuales/quizz.controlles";

router.put("/solve/:quizzId",[authJwt.verifyToken], quizzCtrl.solveQuiz); //resolver examen por los estudiantes

router.put("/solve2/:quizzId",[authJwt.verifyToken], quizzCtrl.segundoIntentoById)

router.put("/:aulaId",[authJwt.verifyToken], quizzCtrl.createQuizz); //crear examen

router.put("/remove/:quizzId",[authJwt.verifyToken], quizzCtrl.deleteQuizzById); //eliminamos examen

router.put("/send/:quizzId",[authJwt.verifyToken], quizzCtrl.saveQuestionById); //crear examen options

router.put("/send2/:quizzId",[authJwt.verifyToken], quizzCtrl.editQuestionById); //editamos examen options

router.put("/editQuizz/:aulaId",[authJwt.verifyToken], quizzCtrl.editExamById); // editar el examen fecha de entrega

export default router;

