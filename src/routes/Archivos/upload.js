import { Router } from "express";
const router = Router();

import * as filesCtrl from "../../controllers/Archivos/upload.controller";

router.post( '/tareas', filesCtrl.upload, filesCtrl.resizeImages2,)

router.post( `/`, filesCtrl.upload, filesCtrl.resizeImages,)


export default router;