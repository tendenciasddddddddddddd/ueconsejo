import { Router } from "express";
const router = Router();

import * as docCtrl from "../../controllers/Registros/docentes.controller";
import { authJwt,verifySignup } from "../../middlewares";

router.get("/buscadordocentes",[authJwt.verifyToken], docCtrl.getBuscadorUsuarios);

router.get("/newdoc",[authJwt.verifyToken], docCtrl.getListasDocentes);

router.get("/query",[authJwt.verifyToken], docCtrl.query);

router.get("/:id",[authJwt.verifyToken], docCtrl.getDocenteById);

router.get(
    "/", 
    [authJwt.verifyToken ],
    docCtrl.getDocentes
    );


router.put("/:usuariosId",[authJwt.verifyToken], docCtrl.updateDocenteById);

router.delete("/:id",[authJwt.verifyToken], docCtrl.deleteDocenteById);

router.post("/",[verifySignup.checkDuplicateUsernameOrEmail, authJwt.verifyToken],docCtrl.createDocentes);

export default router;