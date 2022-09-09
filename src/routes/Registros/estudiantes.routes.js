import { Router } from "express";
const router = Router();

import * as estCtrl from "../../controllers/Registros/estudiantes.controller";
import { authJwt,verifySignup } from "../../middlewares";

router.get("/buscadorestudiantes",[authJwt.verifyToken], estCtrl.getBuscadorUsuarios);

router.get("/newstud", [authJwt.verifyToken], estCtrl.getListasEstudiantes);

router.get("/query", [authJwt.verifyToken], estCtrl.query);

router.get("/:id", [authJwt.verifyToken], estCtrl.getEstudianteById);

router.get("/",  [authJwt.verifyToken ], estCtrl.getEstudiantes);

router.put("/:usuariosId", [authJwt.verifyToken], estCtrl.updateEstudianteById);

router.delete("/:id", [authJwt.verifyToken], estCtrl.deleteEstudianteById);

router.post("/alumnosMany", [authJwt.verifyToken], estCtrl.createEstudianteMany);

router.post("/",[verifySignup.checkDuplicateUsernameOrEmail, authJwt.verifyToken], estCtrl.createEstudiante);


export default router;