import {Router} from "express";

import { postSignUp, postLogin, postLogout } from "./authController.js";
import { isAuth } from "./jwtHandler.js";

const router = Router();

router
    .post("/signup", postSignUp)
    .post("/login", postLogin)
    .post("/logout", isAuth, postLogout);

export default router;
