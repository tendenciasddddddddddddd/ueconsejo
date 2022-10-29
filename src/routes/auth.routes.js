import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";
import { authJwt } from "../middlewares";

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  authCtrl.signUp
);

router.post("/signin", authCtrl.signin);

router.post("/cuenta", authCtrl.cuenta);

router.post("/resetPassword", authCtrl.resetPassword);

router.post("/forgotPassword", authCtrl.forgotPassword);

router.post("/GoogleAuthApis", authCtrl.googleAuthApi);

router.post("/resetPasswordUsers/:id",[authJwt.verifyToken], authCtrl.resetPasswordUsers);

router.put("/cuenta/:cuentaId", authCtrl.newPassword);

export default router;