import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import sendMail from "../helpers/sendMail.js";
import otpHelper from "../helpers/otpHelper.js";


export const getVerificationOTP = async (req, res, next) => {
    try {
        // Check if user exists and is not already an admin.
        const user = await User.findById(req.userId);
        if (user.isAdmin === true) {
            return res.status(400).json({
                "status": "failure",
                "message": "User is already an admin!",
            });
        }
        
        // Generate OTP and mail it to user.
        user.otp = otpHelper.generate();
        user.save();
        sendMail(user.email, user.name, "sentOTP", user.otp);
        res.status(200).json({
            "status": "success",
            "message": "An OTP has been sent successfully to your email address!",
        })
    } catch(error) {
        next(error);
    }
};


export const postVerificationOTP = async (req, res, next) => {
    const { otp } = req.body;
    try {
        // Verify OTP.
        const user = await User.findById(req.userId);
        if (!otpHelper.verify(user.otp, otp)) {
            return res.status(400).json({
                "status": "failure",
                "message": "Wrong OTP",
            });
        }

        // Make user admin on successfull verification.
        user.isAdmin = true;
        sendMail(user.email, user.name, "verifiedOTP", "");
        user.otp = "";
        user.save();
        res.status(200).json({
            "status": "success",
            "message": "OTP verified! You are now an admin!",
        });
    } catch(error) {
        errorHandler(error);
    }
};


export const getAllTransactions = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user.isAdmin === false) {
        return res.status(400).json({
            "status": "failure",
            "message": "You are not an admin!",
        });
    }

    try {
        const transactions = await Transaction.find();
        res.status(200).json({
            status: "success",
            "transactions": transactions,
        });
    } catch(error) {
        errorHandler(error);
    }
    
};


export const getTransactionDetails = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user.isAdmin === false) {
        return res.status(400).json({
            "status": "failure",
            "message": "You are not an admin!",
        });
    }

    const txnId = req.params.transactionId;
    try {
        const txn = await Transaction.findOne({_id: txnId});
        if (!txn) {
            return res.status(404).json({
                "status": "failure",
                "message": "No transaction with given id found.",
            });
        }
        
        await txn.populate({ path: "sender", select: "name email _id"});
        await txn.populate({ path: "receiver", select: "name email _id"});

        res.status(200).json({
            "status": "success",
            "transactionDetails": txn,
        });
    } catch(error) {
        next(error);
    }
};
