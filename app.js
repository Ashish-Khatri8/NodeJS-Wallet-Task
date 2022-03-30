import express from "express";
import bodyParser from "body-parser"; 

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
app.use(bodyParser.json());

// Setting headers to avoid CORS error.
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
    console.log(error);
    res.status(500).json({
        "status": "failure",
        "message": "Some error occured!",
        "error": error,
    });
});

export default app;
