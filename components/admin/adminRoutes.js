import { Router } from "express";
import { isAuth } from "../auth/jwtHandler.js";
import { getAllTransactions, getTransactionDetails, getVerificationOTP, postVerificationOTP } from "./adminController.js";

const router = Router();

router
    .get("/verification/getOTP", isAuth, getVerificationOTP)
    .post("/verification/verifyOTP", isAuth, postVerificationOTP)
    .get("/transactions", isAuth, getAllTransactions)
    .get("/transactions/:transactionId", isAuth, getTransactionDetails);
    
export default router;
