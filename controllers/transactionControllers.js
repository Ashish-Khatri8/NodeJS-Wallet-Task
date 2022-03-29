import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import sendMail from "../helpers/sendMail.js";


export const postSendTransaction = async (req, res, next) => {
    let senderInitialBalance, receiverInitialBalance, txnsSent, txnsReceived;
    let sender, receiver, transferAmount, txnCreated; 
    try {
        sender = await User.findOne({_id: req.userId});
        receiver = await User.findOne({email: req.body.receiverEmail});
        transferAmount = req.body.transferAmount;
        
        // Check if valid reciver is given.
        if (!receiver || receiver._id === sender._id) {
            return res.status(400).json({
                "status": "failure",
                "message": "Enter a valid reciver email!",
            });
        }
        // Check if sender has sufficient balance.
        if (transferAmount > sender.balance) {
            return res.status(400).json({
                "status": "failure",
                "message": "Not Enough Balance!",
            });
        }
    
        // Receiver exists and sender has sufficient balance.
        const txn = new Transaction({
            sender: sender._id,
            receiver: receiver._id,
            amount: transferAmount,
            time: Date.now(),
        });
        txnCreated = await txn.save();

        // Store initial balances and transactions.
        senderInitialBalance = sender.balance;
        receiverInitialBalance = receiver.balance;
        txnsSent = sender.transactions.sent.length;
        txnsReceived = receiver.transactions.received.length;

        // Update balances.
        sender.balance -= transferAmount;
        receiver.balance += transferAmount;
        
        // Update database.
        await sender.transactions.sent.push(txnCreated._id);
        await sender.save();
        await receiver.transactions.received.push(txnCreated._id);
        await receiver.save();

        // Send mails to both sender and receiver.
        sendMail(
            sender.email, 
            sender.name, 
            "txnSentSuccess",
            `You sent ${transferAmount} to ${receiver.name} - (${receiver.email}).
             TransactionId: ${txnCreated._id}
            `, 
        );
        sendMail(
            receiver.email, 
            receiver.name, 
            "txnReceived",
            `You received ${transferAmount} from ${sender.name} - (${sender.email})
             TransactionId: ${txnCreated._id}
            `, 
        );

        res.status(200).json({
            status: "success",
            message: `Transferred ${transferAmount} to ${receiver.email}`,
        });
    } catch(error) {
        // Revert transaction changes if an error occured.
        if (sender.balance !== senderInitialBalance)
            sender.balance = senderInitialBalance;

        if (receiver.balance !== receiverInitialBalance)
            receiver.balance = receiverInitialBalance;
        
        if (Transaction.findOne({_id: txnCreated._id})) {
            await Transaction.findByIdAndDelete(txnCreated._id);
        }

        if (sender.transactions.sent.length > txnsSent)
            await sender.transactions.sent.pop();
        
        if (receiver.transactions.received.length > txnsReceived)
            await receiver.transactions.received.pop();
        
        // Update database.
        sender.save();
        receiver.save();
        
        next(error);
    }
};
