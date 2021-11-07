import { Router } from "express";
const router = Router();

import * as materiaCtrl from "../../controllers/Gestion/materia.controller";
import { authJwt } from "../../middlewares";

router.get("/newmat", materiaCtrl.getListasMaterias);

router.get("/:materiaId", materiaCtrl.getMateriaById);

router.get("/", materiaCtrl.getMateria);

router.put("/:materiaId", materiaCtrl.updateMateriaById);

router.delete("/:id", materiaCtrl.deleteMateriaById);

router.post("/", materiaCtrl.createMateria);

export default router;