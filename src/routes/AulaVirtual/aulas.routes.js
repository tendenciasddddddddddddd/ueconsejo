import { Router } from "express";
const router = Router();

import * as aulaCtrl from "../../controllers/AulasVirtuales/aulas.controller";
import { authJwt } from "../../middlewares";
import { verifySignup } from "../../middlewares";

router.get("/studen", aulaCtrl.getAllAulasEstu);

router.get("/newlist", aulaCtrl.getAulasVirtuales);
//router.get("/", aulaCtrl.createAulasVirtuales);

router.get("/:aulaId", aulaCtrl.getAulassById);

router.post("/", aulaCtrl.createAulasVirtuales);

router.delete("/:aulaId", aulaCtrl.deleteAulaById);

router.put("/:aulaId", aulaCtrl.createAulaById);

export default router;