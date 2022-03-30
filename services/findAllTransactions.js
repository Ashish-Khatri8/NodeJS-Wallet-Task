import Transaction from "../models/transactionModel.js";

const findAllTransactions = async () => {
    return await Transaction.find();
};

export default findAllTransactions;
