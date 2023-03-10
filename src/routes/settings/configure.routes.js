import { Router } from "express";
const router = Router();

import * as Ctrl from "../../controllers/setting/configure.controller";
import { authJwt } from "../../middlewares";

router.put("/apps/:Id", [authJwt.verifyToken], Ctrl.updatAplicacionesById);

router.put("/apertura/:Id", [authJwt.verifyToken], Ctrl.updatAperturaById);

router.put("/:Id", [authJwt.verifyToken], Ctrl.updateConfigureById);

router.get("/apps/", [authJwt.verifyToken], Ctrl.getAplicaciones);

router.get("/apertura/", [authJwt.verifyToken], Ctrl.getApertura);

router.get("/", [authJwt.verifyToken], Ctrl.getConfigure);


export default router;