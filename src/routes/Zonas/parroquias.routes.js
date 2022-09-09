import { Router } from "express";
const router = Router();

import * as parroquiaCtrl from "../../controllers/Zonas/parroquias.controller";
import { authJwt } from "../../middlewares";

router.get("/newcant", [authJwt.verifyToken], parroquiaCtrl.getlistaCantones);

router.get("/query", [authJwt.verifyToken], parroquiaCtrl.query);

router.get("/:parroquiasId", [authJwt.verifyToken], parroquiaCtrl.getParroquiasById);

router.get("/", [authJwt.verifyToken], parroquiaCtrl.getParroquias);

router.post("/", [authJwt.verifyToken], parroquiaCtrl.createParroquias);

router.put("/:parroquiasId", [authJwt.verifyToken], parroquiaCtrl.updateParroquiasById);

router.delete("/:id", [authJwt.verifyToken], parroquiaCtrl.deleteParroquiasById);

router.put('/activate/:id', [authJwt.verifyToken], parroquiaCtrl.activate);


export default router;