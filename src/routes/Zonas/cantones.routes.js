import { Router } from "express";
const router = Router();

import * as cantonCtrl from "../../controllers/Zonas/cantones.controller";
import { authJwt } from "../../middlewares";

router.get("/newprov", cantonCtrl.getlistaProvincias);

router.get("/query", cantonCtrl.query);

router.get("/:cantonesId", cantonCtrl.getCantonesById);

router.get("/", cantonCtrl.getCantones);

router.post("/", cantonCtrl.createCantones);

router.put("/:cantonesId", cantonCtrl.updateCantonesById);

router.delete("/:id", cantonCtrl.deleteCantonesById);

router.put('/activate/:id',cantonCtrl.activate);


export default router;