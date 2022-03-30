import Transaction from "../models/transactionModel.js";
import { retrievePreTxnStatus } from "../helpers/transactionHelper.js";

const revertTransaction = async (sender, receiver, transaction) => {
    const preTxn = retrievePreTxnStatus();

    if (Transaction.findOne({_id: transaction.id})) {
        await Transaction.findByIdAndDelete(transaction.id);
    }

    if (sender.balance !== preTxn.senderBalance)
        sender.balance = preTxn.senderBalance;

    if (receiver.balance !== preTxn.receiverBalance)
        receiver.balance = preTxn.receiverBalance;

    if (sender.transactions.sent.length > preTxn.senderTxnsSent)
        sender.transactions.sent.pop();

    if (receiver.transactions.received.length > preTxn.receiverTxnsReceived)
        receiver.transactions.received.pop();
    
    await sender.save();
    await receiver.save();
};

export default revertTransaction;
        
        

        
        

        
        
        
        
        