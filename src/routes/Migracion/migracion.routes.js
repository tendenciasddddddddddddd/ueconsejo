import { Router } from "express";
const router = Router();

import * as migracionCtrl from "../../controllers/Migraciones/migracion.controller";
import { authJwt } from "../../middlewares";
import { verifySignup } from "../../middlewares"; 

router.get("/query", migracionCtrl.query);

router.get("/search", migracionCtrl.getByIdOfCourseAndPeriod);

router.get("/", migracionCtrl.getQueryAll);

router.post("/matricula", migracionCtrl.createMigracionMatricula);

router.delete("/matricula", migracionCtrl.deleteMatriculasMany);

export default router;