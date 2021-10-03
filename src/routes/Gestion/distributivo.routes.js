import { Router } from "express";
const router = Router();

import * as distributivoCtrl from "../../controllers/Gestion/distributivo.controller";
import { authJwt } from "../../middlewares";

router.get("/nuedist", distributivoCtrl.getInfoDistributivo);

router.get("/:distributivoId", distributivoCtrl.getDistributivoById);

router.post("/", distributivoCtrl.createDistributivo);

router.get("/", distributivoCtrl.getDistributivo);



router.put("/:distributivoId", distributivoCtrl.updateDistributivoById);

router.delete("/:distributivoId", distributivoCtrl.deleteDistributivoById);

export default router;