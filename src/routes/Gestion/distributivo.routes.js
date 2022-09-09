import { Router } from "express";
const router = Router();

const { cacheInit } = require("../../middlewares/cache")

import * as distributivoCtrl from "../../controllers/Gestion/distributivo.controller";
import { authJwt } from "../../middlewares";

router.get("/nuedist",[authJwt.verifyToken], cacheInit, distributivoCtrl.getInfoDistributivo);

router.get("/planificacio/:distributivoId",[authJwt.verifyToken], distributivoCtrl.getPlanificacionById);

router.get("/:distributivoId",[authJwt.verifyToken], distributivoCtrl.getDistributivoById);

router.post("/",[authJwt.verifyToken], distributivoCtrl.createDistributivo);

router.get("/",[authJwt.verifyToken], distributivoCtrl.getDistributivo);

router.put("/planificacion/:distributivoId",[authJwt.verifyToken], distributivoCtrl.updatePlanificacionById);

router.put("/:distributivoId",[authJwt.verifyToken], distributivoCtrl.updateDistributivoById);

router.delete("/:id",[authJwt.verifyToken], distributivoCtrl.deleteDistributivoById);

export default router;