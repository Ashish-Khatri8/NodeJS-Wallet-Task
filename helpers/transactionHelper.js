const preTxnStatus = {
    senderBalance: 0,
    receiverBalance: 0,
    senderTxnsSent: 0,
    receiverTxnsReceived: 0,
}

export const storePreTxnStatus = (senderBalance, receiverBalance, txnsSent, txnsReceived) => {
    preTxnStatus.senderBalance = senderBalance;
    preTxnStatus.receiverBalance = receiverBalance;
    preTxnStatus.senderTxnsSent = txnsSent;
    preTxnStatus.receiverTxnsReceived = txnsReceived;
};

export const retrievePreTxnStatus = () => {
    return preTxnStatus;
};
