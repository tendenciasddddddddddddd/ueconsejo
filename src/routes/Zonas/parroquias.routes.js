import { Router } from "express";
const router = Router();

import * as parroquiaCtrl from "../../controllers/Zonas/parroquias.controller";
import { authJwt } from "../../middlewares";

router.get("/newcant", parroquiaCtrl.getlistaCantones);

router.get("/:parroquiasId", parroquiaCtrl.getParroquiasById);

router.get("/", parroquiaCtrl.getParroquias);

router.post("/", parroquiaCtrl.createParroquias);

router.put("/:parroquiasId", parroquiaCtrl.updateParroquiasById);

router.delete("/:parroquiasId", parroquiaCtrl.deleteParroquiasById);


export default router;