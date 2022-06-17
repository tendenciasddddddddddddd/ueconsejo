import { Router } from "express";
const router = Router();

import  nivelCtrl from "../../controllers/Gestion/nivel.controller";
import { authJwt } from "../../middlewares";

router.get("/level", nivelCtrl.getListasNiveles);

router.get("/:id", nivelCtrl.getNivelById);

router.get("/", nivelCtrl.getNivel);

router.put("/:nivelId", nivelCtrl.updateNivelById);

router.delete("/:id", nivelCtrl.deleteNivelById);

router.post("/", nivelCtrl.createNivel);

router.put('/activate/:id',nivelCtrl.activate);

export default router;