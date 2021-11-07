import { Router } from "express";
const router = Router();

import * as etniasCtrl from "../../controllers/Zonas/etnias.controller";
import { authJwt } from "../../middlewares";

router.get("/childEtnia", etniasCtrl.getChildEtnia);

router.get("/:etniasId", etniasCtrl.getEtniasById);

router.get("/", etniasCtrl.getEtnias);

router.post("/", etniasCtrl.createEtnias);

router.put("/:etniasId", etniasCtrl.updateEtniasById);

router.delete("/:etniasId", etniasCtrl.deleteEtniasById);

export default router;