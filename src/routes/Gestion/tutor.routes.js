import { Router } from "express";
const router = Router();

import * as Ctr from "../../controllers/Gestion/tutor.controlles";
import { authJwt } from "../../middlewares";

router.get("/nuedist",[authJwt.verifyToken],  Ctr.getInfoTutor);

router.get("/fulltutor",[authJwt.verifyToken], Ctr.getAllTutor);

router.post("/many/",[authJwt.verifyToken], Ctr.createArrayTutor);



export default router;