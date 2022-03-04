import { Router } from "express";
const router = Router();

const { cacheInit } = require("../../middlewares/cache")

import * as distributivoCtrl from "../../controllers/Gestion/distributivo.controller";
import { authJwt } from "../../middlewares";

router.get("/nuedist", cacheInit, distributivoCtrl.getInfoDistributivo);

router.get("/:distributivoId", distributivoCtrl.getDistributivoById);

router.post("/", distributivoCtrl.createDistributivo);

router.get("/", distributivoCtrl.getDistributivo);



router.put("/:distributivoId", distributivoCtrl.updateDistributivoById);

router.delete("/:id", distributivoCtrl.deleteDistributivoById);

export default router;