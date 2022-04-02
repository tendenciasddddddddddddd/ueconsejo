import { Router } from "express";
const router = Router();

import * as parroquiaCtrl from "../../controllers/Zonas/parroquias.controller";
import { authJwt } from "../../middlewares";

router.get("/newcant", parroquiaCtrl.getlistaCantones);

router.get("/query", parroquiaCtrl.query);

router.get("/:parroquiasId", parroquiaCtrl.getParroquiasById);

router.get("/", parroquiaCtrl.getParroquias);

router.post("/", parroquiaCtrl.createParroquias);

router.put("/:parroquiasId", parroquiaCtrl.updateParroquiasById);

router.delete("/:id", parroquiaCtrl.deleteParroquiasById);

router.put('/activate/:id',parroquiaCtrl.activate);


export default router;