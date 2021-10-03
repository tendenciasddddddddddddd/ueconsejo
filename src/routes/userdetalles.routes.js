import { Router } from "express";
const router = Router();

import * as userDetalleCRL from "../controllers/userdetalles.controller";
//import { authJwt,verifySignup } from "../middlewares";


router.post("/",
userDetalleCRL.createDetalleEstudiante);

export default router;