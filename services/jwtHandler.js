import jwt from "jsonwebtoken";
import 'dotenv/config';
import failureResponse from "../helpers/failureResponse.js";

export const createToken = async (email, userId) => {
    return await jwt.sign(
        {
            email: email,
            id: userId,
        },
        process.env.JwtSecretKey,
        {expiresIn: "1h"}
    );
};


export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            return failureResponse(res, 401, "Not authenticated!");
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = await jwt.verify(
            token, 
            process.env.JwtSecretKey
        );
        
        if (!decodedToken) {
            return failureResponse(res, 401, "Not authorized!");
        }
        req.userId = decodedToken.id;
        next();

    } catch (error) {
        next(error);
    }
};
