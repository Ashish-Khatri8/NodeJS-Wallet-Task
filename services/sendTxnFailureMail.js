import sendMail from "../helpers/sendMail.js";

const sendTxnFailureMail = (sender, receiver, txnAmount) => {
    // Mail to sender.
    sendMail(
        sender.email, 
        sender.name, 
        "txnFailure",
        `Your transaction of ${txnAmount} to ${receiver.name} - (${receiver.email})
        has failed!.
        `,
    );

};

export default sendTxnFailureMail;
