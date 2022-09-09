import { Router } from "express";
const router = Router();

import * as etniasCtrl from "../../controllers/Zonas/etnias.controller";
import { authJwt } from "../../middlewares";

router.get("/childEtnia", [authJwt.verifyToken], etniasCtrl.getChildEtnia);

router.get("/:etniasId", [authJwt.verifyToken], etniasCtrl.getEtniasById);

router.get("/", [authJwt.verifyToken], etniasCtrl.getEtnias);

router.post("/", [authJwt.verifyToken], etniasCtrl.createEtnias);

router.put("/:etniasId", [authJwt.verifyToken], etniasCtrl.updateEtniasById);

router.delete("/:id", [authJwt.verifyToken], etniasCtrl.deleteEtniasById);

router.put('/activate/:id', [authJwt.verifyToken], etniasCtrl.activate);

export default router;