import { Router } from "express";
const router = Router();

import  nivelCtrl from "../../controllers/Gestion/nivel.controller";
import { authJwt } from "../../middlewares";

router.get("/level",[authJwt.verifyToken], nivelCtrl.getListasNiveles);

router.get("/:id",[authJwt.verifyToken], nivelCtrl.getNivelById);

router.get("/",[authJwt.verifyToken], nivelCtrl.getNivel);

router.put("/:nivelId",[authJwt.verifyToken], nivelCtrl.updateNivelById);

router.delete("/:id",[authJwt.verifyToken], nivelCtrl.deleteNivelById);

router.post("/",[authJwt.verifyToken], nivelCtrl.createNivel);

router.put('/activate/:id',[authJwt.verifyToken],nivelCtrl.activate);

export default router;