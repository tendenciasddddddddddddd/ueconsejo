import { Router } from "express";
const router = Router();

import * as matriCtrl from "../../controllers/Notas/notas.controller";
import { authJwt } from "../../middlewares";

router.get("/list",[authJwt.verifyToken], matriCtrl.getMatriculaNota);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/asistencia",[authJwt.verifyToken], matriCtrl.getMatriculaAsistencia);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.get("/nota/:matriculaId", [authJwt.verifyToken], matriCtrl.getMatriculasNotaById);//OPTENEMOS LA LISTA FILTRADA DE MATRICULADOS

router.put("/reform/:matriculaId",[authJwt.verifyToken], matriCtrl.createNotaArbol1ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/iniciales/:matriculaId",[authJwt.verifyToken], matriCtrl.createNotaInicialesId); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/ref2/:matriculaId",[authJwt.verifyToken], matriCtrl.createNotaArbol2ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/createfullnote/:matriculaId", matriCtrl.createFullNote);

router.put("/createSupletorios/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullSupletorios);

router.put("/createComportamiento/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullComportamiento);

router.put("/createProyectos/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullProyectos);

router.put("/createDhi/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullDhi);

router.put("/createIniciales/:matriculaId",[authJwt.verifyToken], matriCtrl.createFullIniciales);

router.put("/deleteallnote/:matriculaId",[authJwt.verifyToken], matriCtrl.deleteNoteById);


export default router;