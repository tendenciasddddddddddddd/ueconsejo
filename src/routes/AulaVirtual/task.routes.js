import { Router } from "express";
const router = Router();

import * as taskCtrl from "../../controllers/AulasVirtuales/task.controller";
import { authJwt } from "../../middlewares";

router.put("/send/:taskId",[authJwt.verifyToken], taskCtrl.createTaskArbol2ById); //EMPUJA TAREAS NUEVA

router.put("/update/:taskId",[authJwt.verifyToken], taskCtrl.updateTaskSend); //EDITA TAREA

router.put("/removetask/:taskId",[authJwt.verifyToken], taskCtrl.deleteTaskById); //EDITARMOS DATOS DE LA TAREA

router.put("/editTask/:aulaId",[authJwt.verifyToken], taskCtrl.editTaskById); // 

router.put("/editCode/:aulaId",[authJwt.verifyToken], taskCtrl.updateCodigoCourse); // 

router.put("/calificarTask/:aulaId",[authJwt.verifyToken], taskCtrl.calificarTaskById); // CALIFICAR TAREA [DOCENTES,]

router.put("/reviewTask/:aulaId",[authJwt.verifyToken], taskCtrl.reviewTaskById); // CALIFICAR TAREA [DOCENTES,]

router.put("/:aulaId",[authJwt.verifyToken], taskCtrl.createTaskById);  //RUTA CREAR NUEVA TAREAS DE DOCENTES



export default router;

