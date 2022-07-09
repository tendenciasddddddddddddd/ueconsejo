import { Router } from "express";
const router = Router();

import * as quizzCtrl from "../../controllers/AulasVirtuales/quizz.controlles";

router.put("/solve/:quizzId", quizzCtrl.solveQuiz); //resolver examen por los estudiantes

router.put("/:aulaId", quizzCtrl.createQuizz); //crear examen

router.put("/remove/:quizzId", quizzCtrl.deleteQuizzById); //eliminamos examen

router.put("/send/:quizzId", quizzCtrl.saveQuestionById); //crear examen options

router.put("/editQuizz/:aulaId", quizzCtrl.editExamById); // editar el examen fecha de entrega

export default router;

