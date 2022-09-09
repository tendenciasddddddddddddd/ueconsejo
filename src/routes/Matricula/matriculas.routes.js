import { Router } from "express";
const router = Router();

import * as periodoCtrl from "../../controllers/Matricula/periodo.controller";
import { authJwt } from "../../middlewares";

router.get("/allPeriodos",[authJwt.verifyToken], periodoCtrl.getPeriodo);

router.post("/",[authJwt.verifyToken], periodoCtrl.createPeriodo);

router.get("/",[authJwt.verifyToken], periodoCtrl.getPeriodo);

router.get("/:periodoId",[authJwt.verifyToken], periodoCtrl.getPeriodoById);

router.put("/:periodoId",[authJwt.verifyToken], periodoCtrl.updatePeriodoById);

router.delete("/:id",[authJwt.verifyToken], periodoCtrl.deletePeriodoById);

router.put('/activate/:id',[authJwt.verifyToken],periodoCtrl.activate);

export default router;