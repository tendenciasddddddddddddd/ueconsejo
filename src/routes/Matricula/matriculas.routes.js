import { Router } from "express";
const router = Router();

import * as periodoCtrl from "../../controllers/Matricula/periodo.controller";
import { authJwt } from "../../middlewares";

router.get("/allPeriodos", periodoCtrl.getPeriodo);

router.post("/", periodoCtrl.createPeriodo);

router.get("/", periodoCtrl.getPeriodo);

router.get("/:periodoId", periodoCtrl.getPeriodoById);

router.put("/:periodoId", periodoCtrl.updatePeriodoById);

router.delete("/:id", periodoCtrl.deletePeriodoById);

export default router;