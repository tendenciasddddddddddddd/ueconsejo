import { Router } from "express";
const router = Router();

import * as Ctrl from "../../controllers/setting/configure.controller";
import { authJwt } from "../../middlewares";

router.put("/:Id", [authJwt.verifyToken], Ctrl.updateConfigureById);

router.get("/", [authJwt.verifyToken], Ctrl.getConfigure);


export default router;