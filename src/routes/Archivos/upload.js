import { Router } from "express";
const router = Router();

import * as filesCtrl from "../../controllers/Archivos/upload.controller";


router.get('/',filesCtrl.downloadFiles);
/**
 * Ruta: /user GET
 */

router.post(
    `/`,
    filesCtrl.upload,
    filesCtrl.resizeImages,
    
    //filesCtrl.uploadFile,pp
    
)

router.get(
    `/files`,
    filesCtrl.getListFiles
    
    //filesCtrl.uploadFile,
    
)


export default router;