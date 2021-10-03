import { Router } from "express";
const router = Router();

import * as matriCtrl from "../../controllers/Notas/notas.controller";
import { authJwt } from "../../middlewares";

router.get("/list", matriCtrl.getMatriculaNota);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/asistencia", matriCtrl.getMatriculaAsistencia);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/nota/:matriculaId", matriCtrl.getMatriculasNotaById);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.put("/reform/:matriculaId", matriCtrl.createNotaArbol1ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/ref2/:matriculaId", matriCtrl.createNotaArbol2ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/ref3/:matriculaId", matriCtrl.createNotaArbol3ById); //CONFIRMAR LAS NORAS DE ESTUDIANTES


export default router;