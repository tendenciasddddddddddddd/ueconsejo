import { Router } from "express";
const router = Router();

const { cacheInit } = require("../../middlewares/cache")

import * as aulaCtrl from "../../controllers/AulasVirtuales/aulas.controller";
import { authJwt } from "../../middlewares";
import { verifySignup } from "../../middlewares";

router.get("/studen",[authJwt.verifyToken], aulaCtrl.getAllAulasEstu);

router.get("/newlist",  [authJwt.verifyToken], aulaCtrl.getAulasVirtuales);

router.get("/mainlist/:aulaId",[authJwt.verifyToken] , aulaCtrl.getAulasMainById);

router.get("/:aulaId",[authJwt.verifyToken], aulaCtrl.getAulassById);

router.post("/",[authJwt.verifyToken], aulaCtrl.createAulasVirtuales);

router.delete("/:aulaId",[authJwt.verifyToken], aulaCtrl.deleteAulaById);

router.put("/users/:taskId",[authJwt.verifyToken], aulaCtrl.deleteUserById);

router.put("/:aulaId",[authJwt.verifyToken], aulaCtrl.createAulaById);

export default router;