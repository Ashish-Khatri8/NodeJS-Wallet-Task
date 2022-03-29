import {Router} from "express";

import { postSignUp, postLogin, postLogout } from "../controllers/authControllers.js";
import { isAuth } from "../services/jwtHandler.js";

const router = Router();

router
    .post("/signup", postSignUp)
    .post("/login", postLogin)
    .post("/logout", isAuth, postLogout);

export default router;
