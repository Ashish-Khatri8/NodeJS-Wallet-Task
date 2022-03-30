import findUser from "../services/findUser.js";
import updateUser from "../services/updateUser.js";
import findAllTransactions from "../services/findAllTransactions.js";
import findTransaction from "../services/findTransaction.js";

import sendMail from "../helpers/sendMail.js";
import otpHelper from "../helpers/otpHelper.js";
import successResponse from "../helpers/successResponse.js";
import failureResponse from "../helpers/failureResponse.js";


export const getVerificationOTP = async (req, res, next) => {
    try {
        // Check if user is already not an admin.
        const user = await findUser({_id: req.userId});
        if (user.isAdmin === true) {
            return failureResponse(res, 400, "User is already an admin!");
        }
        // Generate OTP and mail it to user.
        const otp = otpHelper.generate();
        await updateUser(user, "otp", otp);

        sendMail(user.email, user.name, "sentOTP", user.otp);
        successResponse(res, 200, "Verification OTP sent to your email address!");
    
    } catch(error) {
        next(error);
    }
};


export const postVerificationOTP = async (req, res, next) => {
    try {
        const { otp } = req.body;
        // Verify OTP.
        const user = await findUser({_id: req.userId});
        const isOTPValid = await otpHelper.verify(user.otp, otp);
        if (!isOTPValid) {
            return failureResponse(res, 400, "Invalid OTP!");
        }
        
        // Make user admin on successfull OTP verification.
        await updateUser(user, "isAdmin", true);
        await updateUser(user,"otp", "");
        // Send confirmation email.
        sendMail(user.email, user.name, "verifiedOTP");
        successResponse(res, 200, "OTP verified! You are now an admin!");

    } catch(error) {
        next(error);
    }
};


export const getAllTransactions = async (req, res, next) => {
    try {
        const user = await findUser({_id: req.userId});
        if (user.isAdmin === false) {
            return failureResponse(res, 403, "You are not an admin! Verify email to continue!");
        }
        const transactions = await findAllTransactions();
        successResponse(res, 200, `Transactions found: ${transactions.length}.`, transactions);
    
    } catch(error) {
        next(error);
    }
    
};


export const getTransactionDetails = async (req, res, next) => {
    try {
        const user = await findUser({_id: req.userId});
        if (user.isAdmin === false) {
            return failureResponse(res, 403, "You are not an admin! Verify email to continue!");
        }
        
        const txnId = req.params.transactionId;
        const txn = await findTransaction(txnId);
        if (!txn) {
            return failureResponse(res, 404, "No transaction with given id found.");
        }
        successResponse(res, 200, "Transaction found.", txn);

    } catch(error) {
        next(error);
    }
};
