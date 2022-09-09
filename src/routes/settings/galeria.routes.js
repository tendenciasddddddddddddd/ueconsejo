import { Router } from "express";
const router = Router();

import * as Ctrl from "../../controllers/setting/galeria.controller";
import { authJwt } from "../../middlewares";

router.post("/", [authJwt.verifyToken], Ctrl.createGaleria);

router.get("/", [authJwt.verifyToken], Ctrl.getGaleria);

router.delete("/:id", [authJwt.verifyToken], Ctrl.deleteGaleriaById);

export default router;