import { Router } from "express";
const router = Router();

import * as estCtrl from "../../controllers/Registros/estudiantes.controller";
import { authJwt,verifySignup } from "../../middlewares";

router.get("/buscadorestudiantes",[authJwt.verifyToken], estCtrl.getBuscadorUsuarios);

router.get("/newstud", estCtrl.getListasEstudiantes);

router.get("/query", estCtrl.query);

router.get("/:id", estCtrl.getEstudianteById);

router.get(
    "/", 
    [authJwt.verifyToken ],
    estCtrl.getEstudiantes
    );


router.put("/:usuariosId", estCtrl.updateEstudianteById);

router.delete("/:id", estCtrl.deleteEstudianteById);

router.post("/alumnosMany", estCtrl.createEstudianteMany);

router.post("/",
[verifySignup.checkDuplicateUsernameOrEmail],
estCtrl.createEstudiante);


export default router;