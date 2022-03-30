import findUser from "../services/findUser.js";
import updateUser from "../services/updateUser.js";
import createTransaction from "../services/createTransaction.js";
import revertTransaction from "../services/revertTransaction.js";
import sendTxnSuccessMails from "../services/sendTxnConfirmationMails.js";
import sendTxnFailureMail from "../services/sendTxnFailureMail.js";

import { storePreTxnStatus } from "../helpers/transactionHelper.js";
import successResponse from "../helpers/successResponse.js";
import failureResponse from "../helpers/failureResponse.js";


export const postSendTransaction = async (req, res, next) => {
    let sender, receiver, transferAmount, txnCreated;
    try {
        sender = await findUser({_id: req.userId});
        receiver = await findUser({email: req.body.receiverEmail});
        transferAmount = req.body.transferAmount;
        
        // Check if valid receiver is given.
        if (!receiver || receiver._id === sender._id) {
            return failureResponse(res, 400, "Enter a valid receiver email!");
        }
        // Check if sender has sufficient balance.
        if (transferAmount > sender.balance) {
            return failureResponse(res, 400, "Not enough balance!");
        }
    
        // Receiver exists and sender has sufficient balance.
       txnCreated = await createTransaction(sender._id, receiver._id, transferAmount);

        // Store initial balances and transactions.
        storePreTxnStatus(
            sender.balance, 
            receiver.balance, 
            sender.transactions.sent.length,
            receiver.transactions.received.length,
        );
      
        // Update balances.
        await updateUser(sender, "balance", sender.balance - transferAmount);
        await updateUser(receiver, "balance", receiver.balance + transferAmount);
        
        // Update sender and receiver transactions.
        await updateUser(sender, ["transactions", "sent"], txnCreated._id);
        await updateUser(receiver, ["transactions", "received"], txnCreated._id);

        // Send txn success mails to both sender and receiver.
        sendTxnSuccessMails(sender, receiver, txnCreated);
        successResponse(res, 200, 
            `Transferred ${transferAmount} to ${receiver.email}`, 
            txnCreated
        );

    } catch(error) {
        // Revert transaction changes if an error occured.
        await revertTransaction(sender, receiver, txnCreated);
        sendTxnFailureMail(sender, receiver, transferAmount);
        next(error);
    }
};
