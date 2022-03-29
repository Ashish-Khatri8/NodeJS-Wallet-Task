import { Router } from "express";
import { postSendTransaction } from "../controllers/transactionControllers.js";
import { isAuth } from "../services/jwtHandler.js";

const router = Router();

router.post("/transaction/send", isAuth, postSendTransaction);

export default router;
