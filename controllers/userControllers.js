import findUser from "../services/findUser.js";
import successResponse from "../helpers/successResponse.js";

export const getUserDetails = async (req, res, next) => {
    const user = await findUser({_id: req.userId});
    successResponse(res, 200, "User details found.", user);
};

export const getUserBalance = async (req, res, next) => {
    const user = await findUser({_id: req.userId});
    successResponse(res, 200, "User balance found.", user.balance);
};

export const getUserTransactions = async (req, res, next) => {
    const user = await findUser({_id: req.userId});
    successResponse(res, 200, "User transactions found.", user.transactions);
};
