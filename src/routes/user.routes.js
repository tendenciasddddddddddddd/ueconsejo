import { Router } from "express";
const router = Router();

import * as usuariosCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

router.get("/buscadorusuarioss", [authJwt.verifyToken], usuariosCtrl.getBuscadorUsuarios);

router.get("/newrol", [authJwt.verifyToken], usuariosCtrl.getRoles);

router.get("/query", [authJwt.verifyToken], usuariosCtrl.query);

router.get("/:id", [authJwt.verifyToken], usuariosCtrl.getUsuariosById);

router.get( "/",  [authJwt.verifyToken], usuariosCtrl.getUsuarios);

router.put("/:usuariosId", [authJwt.verifyToken], usuariosCtrl.updateUsuariosById);

router.delete("/:id", [authJwt.verifyToken], usuariosCtrl.deleteUsuariosById);

router.put('/activate/:id',[authJwt.verifyToken], usuariosCtrl.activate);

export default router;