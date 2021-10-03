import { Router } from "express";
const router = Router();

import * as nivelCtrl from "../../controllers/Gestion/nivel.controller";
import { authJwt } from "../../middlewares";

router.get("/level", nivelCtrl.getListasNiveles);

router.get("/:id", nivelCtrl.getNivelById);

router.get("/", nivelCtrl.getNivel);

router.put("/:nivelId", nivelCtrl.updateNivelById);

router.delete("/:nivelId", nivelCtrl.deleteNivelById);

router.post("/", nivelCtrl.createNivel);

export default router;