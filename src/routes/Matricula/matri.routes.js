import { Router } from "express";
const router = Router();

import * as matriCtrl from "../../controllers/Matricula/matricula.controller";
import { authJwt } from "../../middlewares";
import { verifySignup } from "../../middlewares"; //ConsultarMatriculaFolio


router.get("/datas/:matriculaId", matriCtrl.getMatriculasNotaBykEY); //RUTA PARA CONSULTAR NUM MATRICULA Y FOLIO

router.get("/consult", matriCtrl.getMatriculaFolio); //RUTA PARA CONSULTAR NUM MATRICULA Y FOLIO

router.get("/fullmatricula", matriCtrl.getListaMatricula); //RUTA DE CONSULTA TODOS LOS MATRICULADOS

router.get("/queryMatricula", matriCtrl.getQueryAll);

router.get("/report", matriCtrl.getReportes);

router.get("/:matriculaId", matriCtrl.getMatriculasById);

router.get("/", matriCtrl.getMatriculas);

router.post("/", 
matriCtrl.createMatriculas);


router.put("/:matriculaId", matriCtrl.updateMatriculasById);

router.delete("/:id", matriCtrl.deleteMatriculasById);

export default router;