import { Router } from "express";
const router = Router();

const { cacheInit } = require("../../middlewares/cache")

import * as Ctr from "../../controllers/Gestion/distributivo.controller";
import { authJwt } from "../../middlewares";

router.get("/nuedist",[authJwt.verifyToken],  Ctr.getInfoDistributivo);

router.get("/fulldistributivo",[authJwt.verifyToken], Ctr.getAllDistributivo);

router.get("/planificacio/:distributivoId",[authJwt.verifyToken], Ctr.getPlanificacionById);

router.get("/:distributivoId",[authJwt.verifyToken], Ctr.getDistributivoById);

router.post("/many/",[authJwt.verifyToken], Ctr.createArrayDistributivo);

router.get("/",[authJwt.verifyToken], Ctr.getDistributivo);

router.put("/planificacion/:distributivoId",[authJwt.verifyToken], Ctr.updatePlanificacionById);

router.put("/:distributivoId",[authJwt.verifyToken], Ctr.deletePlanificacion);


export default router;