import { Router } from "express";
const router = Router();

import * as provinciasCtrl from "../../controllers/Zonas/provincias.controller";
import { authJwt } from "../../middlewares";

router.post("/", provinciasCtrl.createProvincias);

router.get("/query", provinciasCtrl.query);

router.get("/", provinciasCtrl.getProvincias);

router.get("/:provinciasId", provinciasCtrl.getProvinciasById);

router.put("/:provinciasId", provinciasCtrl.updateProvinciasById);

router.delete("/:id", provinciasCtrl.deleteProvinciasById);

router.put('/activate/:id',provinciasCtrl.activate);

export default router;