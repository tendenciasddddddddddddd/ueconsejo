import { Router } from "express";
const router = Router();

import * as materiaCtrl from "../../controllers/Gestion/materia.controller";
import { authJwt } from "../../middlewares";

router.get("/newmat",[authJwt.verifyToken], materiaCtrl.getListasMaterias);

router.get("/:materiaId",[authJwt.verifyToken], materiaCtrl.getMateriaById);

router.get("/",[authJwt.verifyToken], materiaCtrl.getMateria);

router.put("/:materiaId",[authJwt.verifyToken], materiaCtrl.updateMateriaById);

router.delete("/:id",[authJwt.verifyToken], materiaCtrl.deleteMateriaById);

router.post("/",[authJwt.verifyToken], materiaCtrl.createMateria);

router.put('/activate/:id',[authJwt.verifyToken],materiaCtrl.activate);

export default router;