import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
            min: 0,
            default: 1000,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        otp: {
            type: String,
            required: false,
            default: "",
        },
        transactions: {
            sent: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction",
                required: true,
            }],
            received: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction",
                required: true,
            }], 
        },
    },
    { timestamps: true },
);

export default mongoose.model("User", userSchema);
