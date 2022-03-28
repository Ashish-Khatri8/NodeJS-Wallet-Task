import express from "express";
import bodyParser from "body-parser"; 
import mongoose from "mongoose";
import userRoutes from "./components/users/userRoutes.js";
import adminRoutes from "./components/admin/adminRoutes.js";
import authRoutes from "./components/auth/authRoutes.js";
import transactionRoutes from "./components/transactions/transactionRoutes.js";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(transactionRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({
        "status": "failure",
        "message": "Some error occured!",
        "error": error,
    });
});

export default app;
