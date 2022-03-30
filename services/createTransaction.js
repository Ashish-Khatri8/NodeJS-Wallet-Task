import Transaction from "../models/transactionModel.js";

const createTransaction = async (senderId, receiverId, transferAmount) => {
    const txn = new Transaction({
        sender: senderId,
        receiver: receiverId,
        amount: transferAmount,
        time: Date.now(),
    });
    return await txn.save();
};

export default createTransaction;
