import sendMail from "../helpers/sendMail.js";

const sendTxnSuccessMails = (sender, receiver, transaction) => {
    // Mail to sender.
    sendMail(
        sender.email, 
        sender.name, 
        "txnSentSuccess",
        `You sent ${transaction.amount} to ${receiver.name} - (${receiver.email}).
        TransactionId: ${transaction._id}
        `, 
    );

    // Mail to receiver.
    sendMail(
        receiver.email, 
        receiver.name, 
        "txnReceived",
        `You received ${transaction.amount} from ${sender.name} - (${sender.email})
        TransactionId: ${transaction._id}
        `, 
    );
};

export default sendTxnSuccessMails;
