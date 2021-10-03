import { Router } from "express";
const router = Router();

import * as docCtrl from "../../controllers/Registros/docentes.controller";
import { authJwt,verifySignup } from "../../middlewares";

router.get("/newdoc", docCtrl.getListasDocentes);

router.get("/:id", docCtrl.getDocenteById);

router.get(
    "/", 
    [authJwt.verifyToken  ,  authJwt.isAdmin],
    docCtrl.getDocentes
    );


router.put("/:usuariosId", docCtrl.updateDocenteById);

router.delete("/:id", docCtrl.deleteDocenteById);

router.post("/",
[verifySignup.checkDuplicateUsernameOrEmail],
docCtrl.createDocentes);

export default router;