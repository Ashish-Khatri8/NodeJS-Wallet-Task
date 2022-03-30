import Transaction from "../models/transactionModel.js";

const findTransaction = async (transactionId) => {
    const txn = await Transaction.findOne({_id: transactionId});
    await txn.populate({ path: "sender", select: "name email _id"});
    await txn.populate({ path: "receiver", select: "name email _id"});
    return txn;
};

export default findTransaction;
