"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var authCtrl = _interopRequireWildcard(require("../controllers/auth.controller"));

var _middlewares = require("../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
router.get("/", [_middlewares.authJwt.verifyToken], authCtrl.veficUser);
router.post("/signup", [_middlewares.verifySignup.checkDuplicateUsernameOrEmail, _middlewares.verifySignup.checkRolesExisted], authCtrl.signUp);
router.post("/signin", authCtrl.signin);
router.post("/cuenta", authCtrl.cuenta);
router.post("/resetPassword", authCtrl.resetPassword);
router.post("/forgotPassword", authCtrl.forgotPassword);
router.post("/GoogleAuthApis", authCtrl.googleAuthApi);
router.post("/resetPasswordUsers/:id", [_middlewares.authJwt.verifyToken], authCtrl.resetPasswordUsers);
router.put("/cuenta/:cuentaId", authCtrl.newPassword);
var _default = router;
exports.default = _default;