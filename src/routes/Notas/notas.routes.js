import { Router } from "express";
const router = Router();

import * as matriCtrl from "../../controllers/Notas/notas.controller";
import { authJwt } from "../../middlewares";

router.get("/list",[authJwt.verifyToken], matriCtrl.getMatriculaNota);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/asistencia",[authJwt.verifyToken], matriCtrl.getMatriculaAsistencia);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/nota/:matriculaId", [authJwt.verifyToken], matriCtrl.getMatriculasNotaById);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.put("/reform/:matriculaId",[authJwt.verifyToken], matriCtrl.createNotaArbol1ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/ref2/:matriculaId",[authJwt.verifyToken], matriCtrl.createNotaArbol2ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/ref3/:matriculaId",[authJwt.verifyToken], matriCtrl.createNotaArbol3ById); //CONFIRMAR LAS NORAS DE ESTUDIANTES //createFullNote

router.put("/createfullnote/:matriculaId", matriCtrl.createFullNote);

router.put("/createSupletorios/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullSupletorios);

router.put("/createComportamiento/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullComportamiento);

router.put("/createProyectos/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullProyectos);

router.put("/deleteallnote/:matriculaId",[authJwt.verifyToken], matriCtrl.deleteNoteById);

router.put("/confirmfullnote/:matriculaId",[authJwt.verifyToken], matriCtrl.confirmFullNoteById);


export default router;