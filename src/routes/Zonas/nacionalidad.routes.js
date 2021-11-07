import { Router } from "express";
const router = Router();

import * as nacionalidadCtrl from "../../controllers/Zonas/nacionalidad.controller";
import { authJwt } from "../../middlewares";


router.get("/childnacionalidad", nacionalidadCtrl.getChildNacionalidad);

router.get("/:nacionalidadId", nacionalidadCtrl.getNacionalidadById);

router.get("/", nacionalidadCtrl.getNacionalidad);

router.post("/", nacionalidadCtrl.createNacionalidad);

router.put("/:nacionalidadId", nacionalidadCtrl.updateNacionalidadById);

router.delete("/:nacionalidadId", nacionalidadCtrl.deleteNacionalidadById);

export default router;