import { Router } from "express";
const router = Router();

import * as nacionalidadCtrl from "../../controllers/Zonas/nacionalidad.controller";
import { authJwt } from "../../middlewares";


router.get("/childnacionalidad", [authJwt.verifyToken], nacionalidadCtrl.getChildNacionalidad);

router.get("/:nacionalidadId", [authJwt.verifyToken], nacionalidadCtrl.getNacionalidadById);

router.get("/", [authJwt.verifyToken], nacionalidadCtrl.getNacionalidad);

router.post("/", [authJwt.verifyToken], nacionalidadCtrl.createNacionalidad);

router.put("/:nacionalidadId", [authJwt.verifyToken], nacionalidadCtrl.updateNacionalidadById);

router.delete("/:id", [authJwt.verifyToken], nacionalidadCtrl.deleteNacionalidadById);

router.put('/activate/:id', [authJwt.verifyToken], nacionalidadCtrl.activate);

export default router;