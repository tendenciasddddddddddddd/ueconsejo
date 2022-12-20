import { Router } from "express";
const router = Router();

import * as matriCtrl from "../../controllers/Matricula/matricula.controller";
import { authJwt } from "../../middlewares";
import { verifySignup } from "../../middlewares"; //ConsultarMatriculaFolio


router.get("/datas/:matriculaId",[authJwt.verifyToken], matriCtrl.getMatriculasNotaBykEY); //RUTA PARA CONSULTAR NUM MATRICULA Y FOLIO

router.get("/consult",[authJwt.verifyToken], matriCtrl.getMatriculaFolio); //RUTA PARA CONSULTAR NUM MATRICULA Y FOLIO

router.get("/fullmatricula",[authJwt.verifyToken], matriCtrl.getListaMatricula); //RUTA DE CONSULTA TODOS LOS MATRICULADOS

router.get("/queryMatricula",[authJwt.verifyToken], matriCtrl.getQueryAll);

router.get("/report",[authJwt.verifyToken], matriCtrl.getReportes);

router.get("/repo/:matriculaId",[authJwt.verifyToken], matriCtrl.getMatriculaByIdReport);

router.get("/:matriculaId",[authJwt.verifyToken], matriCtrl.getMatriculasById);

router.get("/",[authJwt.verifyToken], matriCtrl.getMatriculas);

router.post("/",[authJwt.verifyToken], matriCtrl.createMatriculas);

router.put("/removemateria/:matriculaId",[authJwt.verifyToken], matriCtrl.deleteMateriaById); //EDITARMOS DATOS DE LA TAREA

router.put("/:matriculaId",[authJwt.verifyToken], matriCtrl.updateMatriculasById);

router.delete("/:id",[authJwt.verifyToken], matriCtrl.deleteMatriculasById);

export default router;