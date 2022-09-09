import { Router } from "express";
const router = Router();

import * as migracionCtrl from "../../controllers/Migraciones/migracion.controller";
import { authJwt } from "../../middlewares";
import { verifySignup } from "../../middlewares"; 

router.get("/query",[authJwt.verifyToken], migracionCtrl.query);

router.get("/search",[authJwt.verifyToken], migracionCtrl.getByIdOfCourseAndPeriod);

router.get("/",[authJwt.verifyToken], migracionCtrl.getQueryAll);

router.post("/matricula",[authJwt.verifyToken], migracionCtrl.createMigracionMatricula);

router.delete("/matricula",[authJwt.verifyToken], migracionCtrl.deleteMatriculasMany);

export default router;