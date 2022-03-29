import { Router } from "express";
import { getUserDetails, getUserBalance, getUserTransactions } from "../controllers/userControllers.js";
import { isAuth } from "../services/jwtHandler.js";

const router = Router();

router
    .get("/details", isAuth, getUserDetails)
    .get("/balance", isAuth, getUserBalance)
    .get("/transactions", isAuth, getUserTransactions);


export default router;
