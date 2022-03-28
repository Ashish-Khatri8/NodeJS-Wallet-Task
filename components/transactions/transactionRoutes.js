import { Router } from "express";
import { postSendTransaction } from "./transactionController.js";
import { isAuth } from "../auth/jwtHandler.js";

const router = Router();

router.post("/transaction/send", isAuth, postSendTransaction);

export default router;
