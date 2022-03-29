import mongoose from "mongoose";
import app from "./app.js";
import 'dotenv/config';

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MongoURL;

mongoose.connect(mongoDbUrl)
    .then(connection => {
        app.listen(port);
        console.log(`Server running at Port ${port}`);
    })
    .catch(err => {
        console.log(err);
    });
