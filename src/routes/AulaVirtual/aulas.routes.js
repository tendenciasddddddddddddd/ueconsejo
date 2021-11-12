import { Router } from "express";
const router = Router();

import * as aulaCtrl from "../../controllers/AulasVirtuales/aulas.controller";
import { authJwt } from "../../middlewares";
import { verifySignup } from "../../middlewares";

router.get("/studen",[authJwt.verifyToken], aulaCtrl.getAllAulasEstu);

router.get("/newlist",[authJwt.verifyToken], aulaCtrl.getAulasVirtuales);
//router.get("/", aulaCtrl.createAulasVirtuales);

router.get("/:aulaId",[authJwt.verifyToken], aulaCtrl.getAulassById);

router.post("/",[authJwt.verifyToken], aulaCtrl.createAulasVirtuales);

router.delete("/:aulaId",[authJwt.verifyToken], aulaCtrl.deleteAulaById);

router.put("/:aulaId", aulaCtrl.createAulaById);

export default router;