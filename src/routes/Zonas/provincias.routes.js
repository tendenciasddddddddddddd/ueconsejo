import { Router } from "express";
const router = Router();

import * as provinciasCtrl from "../../controllers/Zonas/provincias.controller";
import { authJwt } from "../../middlewares";

router.post("/", provinciasCtrl.createProvincias);

router.get("/", provinciasCtrl.getProvincias);

router.get("/:provinciasId", provinciasCtrl.getProvinciasById);

router.put("/:provinciasId", provinciasCtrl.updateProvinciasById);

router.delete("/:provinciasId", provinciasCtrl.deleteProvinciasById);

export default router;