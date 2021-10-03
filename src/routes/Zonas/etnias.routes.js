import { Router } from "express";
const router = Router();

import * as etniasCtrl from "../../controllers/Zonas/etnias.controller";
import { authJwt } from "../../middlewares";

router.post("/", etniasCtrl.createEtnias);

router.get("/", etniasCtrl.getEtnias);

router.get("/:etniasId", etniasCtrl.getEtniasById);

router.put("/:etniasId", etniasCtrl.updateEtniasById);

router.delete("/:etniasId", etniasCtrl.deleteEtniasById);

export default router;