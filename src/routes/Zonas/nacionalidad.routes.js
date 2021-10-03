import { Router } from "express";
const router = Router();

import * as nacionalidadCtrl from "../../controllers/Zonas/nacionalidad.controller";
import { authJwt } from "../../middlewares";

router.post("/", nacionalidadCtrl.createNacionalidad);

router.get("/", nacionalidadCtrl.getNacionalidad);

router.get("/:nacionalidadId", nacionalidadCtrl.getNacionalidadById);

router.put("/:nacionalidadId", nacionalidadCtrl.updateNacionalidadById);

router.delete("/:nacionalidadId", nacionalidadCtrl.deleteNacionalidadById);

export default router;