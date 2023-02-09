import { Router } from "express";
const router = Router();

import * as Ctrl from "../../controllers/Asistencia/asistencia.controller.js";
import { authJwt } from "../../middlewares";

router.put("/justificar/:matriculaId",[authJwt.verifyToken], Ctrl.justificarFaltas); 

router.put("/:matriculaId",[authJwt.verifyToken], Ctrl.createAsistenciaById); 


export default router;