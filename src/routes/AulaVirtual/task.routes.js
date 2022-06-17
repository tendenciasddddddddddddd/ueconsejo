import { Router } from "express";
const router = Router();

import * as taskCtrl from "../../controllers/AulasVirtuales/task.controller";


router.put("/send/:taskId", taskCtrl.createTaskArbol2ById); //EMPUJA TAREAS NUEVA

router.put("/update/:taskId", taskCtrl.updateTaskSend); //EDITA TAREA

router.put("/removetask/:taskId", taskCtrl.deleteTaskById); //EDITARMOS DATOS DE LA TAREA

router.put("/editTask/:aulaId", taskCtrl.editTaskById); // 

router.put("/editCode/:aulaId", taskCtrl.updateCodigoCourse); // 

router.put("/calificarTask/:aulaId", taskCtrl.calificarTaskById); // CALIFICAR TAREA [DOCENTES,]

router.put("/reviewTask/:aulaId", taskCtrl.reviewTaskById); // CALIFICAR TAREA [DOCENTES,]

router.put("/:aulaId", taskCtrl.createTaskById);  //RUTA CREAR NUEVA TAREAS DE DOCENTES



export default router;

