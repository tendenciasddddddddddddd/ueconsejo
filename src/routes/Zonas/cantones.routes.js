import { Router } from "express";
const router = Router();

import * as cantonCtrl from "../../controllers/Zonas/cantones.controller";
import { authJwt } from "../../middlewares";

router.get("/newprov", [authJwt.verifyToken], cantonCtrl.getlistaProvincias);

router.get("/query", [authJwt.verifyToken], cantonCtrl.query);

router.get("/:cantonesId", [authJwt.verifyToken], cantonCtrl.getCantonesById);

router.get("/", [authJwt.verifyToken], cantonCtrl.getCantones);

router.post("/", [authJwt.verifyToken], cantonCtrl.createCantones);

router.put("/:cantonesId", [authJwt.verifyToken], cantonCtrl.updateCantonesById);

router.delete("/:id", [authJwt.verifyToken], cantonCtrl.deleteCantonesById);

router.put('/activate/:id', [authJwt.verifyToken],cantonCtrl.activate);


export default router;