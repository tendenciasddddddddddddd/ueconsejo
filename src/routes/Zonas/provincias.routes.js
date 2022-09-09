import { Router } from "express";
const router = Router();

import * as provinciasCtrl from "../../controllers/Zonas/provincias.controller";
import { authJwt } from "../../middlewares";

router.post("/", [authJwt.verifyToken], provinciasCtrl.createProvincias);

router.get("/query", [authJwt.verifyToken], provinciasCtrl.query);

router.get("/", [authJwt.verifyToken], provinciasCtrl.getProvincias);

router.get("/:provinciasId", [authJwt.verifyToken], provinciasCtrl.getProvinciasById);

router.put("/:provinciasId", [authJwt.verifyToken], provinciasCtrl.updateProvinciasById);

router.delete("/:id", [authJwt.verifyToken], provinciasCtrl.deleteProvinciasById);

router.put('/activate/:id', [authJwt.verifyToken], provinciasCtrl.activate);

export default router;