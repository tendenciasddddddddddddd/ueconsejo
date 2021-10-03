import { Router } from "express";
const router = Router();

import * as estCtrl from "../../controllers/Registros/estudiantes.controller";
import { authJwt,verifySignup } from "../../middlewares";

router.get("/newstud", estCtrl.getListasEstudiantes);

router.get("/:id", estCtrl.getEstudianteById);

router.get(
    "/", 
    [authJwt.verifyToken  ,  authJwt.isAdmin],
    estCtrl.getEstudiantes
    );


router.put("/:usuariosId", estCtrl.updateEstudianteById);

router.delete("/:id", estCtrl.deleteEstudianteById);

router.post("/",
[verifySignup.checkDuplicateUsernameOrEmail],
estCtrl.createEstudiante);

export default router;