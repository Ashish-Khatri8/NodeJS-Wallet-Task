import { Router } from "express";
import { getUserDetails, getUserBalance, getUserTransactions } from "./userController.js";
import { isAuth } from "../auth/jwtHandler.js";

const router = Router();

router
    .get("/details", isAuth, getUserDetails)
    .get("/balance", isAuth, getUserBalance)
    .get("/transactions", isAuth, getUserTransactions);


export default router;
