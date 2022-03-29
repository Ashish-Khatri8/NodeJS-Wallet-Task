import User from "../models/userModel.js";

export const findUserHelper = async (userId) => {
    try {
        const user = await User.findOne({_id: userId});
        if (user) {
            return user;
        } else {
            return res.status(400).json({
                "status": "failure",
                "message": "No user found!",
            });
        }
    } catch(error) {
        next(error);
    }
};

export const getUserDetails = async (req, res, next) => {
    const user = await findUserHelper(req.userId);
    res.status(200).json({
        "message": "success",
        "userDetails": user,
    });
};

export const getUserBalance = async (req, res, next) => {
    const user = await findUserHelper(req.userId);
    res.status(200).json({
        "status": "success",
        "balance": user.balance,
    });
};

export const getUserTransactions = async (req, res, next) => {
    const user = await findUserHelper(req.userId);
    res.status(200).json({
        "status": "success",
        "transactions": user.transactions,
    });
};
