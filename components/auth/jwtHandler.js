import jwt from "jsonwebtoken";
import 'dotenv/config';

export const createToken = (email, userId) => {
    try {
        return jwt.sign(
            {
                email: email,
                id: userId,
            },
            process.env.JwtSecretKey,
            {expiresIn: "1h"}
        );
    } catch(error) {
        next(error);
    }
};


export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            return res.status(401).json({
                "status": "failure",
                "message": "Not Authenticated!",
            });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = await jwt.verify(
            token, 
            process.env.JwtSecretKey
        );
        
        if (!decodedToken) {
            res.status(401).json({
                "status": "failure",
                "message": "Not Authorized!", 
            });
        }

        req.userId = decodedToken.id;
        next();
    } catch (error) {
        next(error);
    }
};
