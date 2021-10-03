import { Router } from "express";
const router = Router();

import * as paisesCtrl from "../controllers/paises.controller";
import { authJwt } from "../middlewares";

router.post("/", paisesCtrl.createPaises);

export default router;