import bcrypt from "bcryptjs";

import User from "../users/userModel.js";
import { createToken } from "./jwtHandler.js";
import sendMail from "../Services/sendMail.js";

export const postSignUp = async (req, res, next) => {
    // Get user input from req body.
    const { name, email, password } = req.body;

    try {
        // Check if user already exists.
        if (await User.findOne({email: email})) {
            return res.status(409).json({
                "status": "failure",
                "message": "An user with provided email already exists!",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create new user if no user found.
        const user = new User({
            email: email,
            name: name,
            password: hashedPassword,
            balance: 1000,
            isAdmin: false,
            transactions: {sent: [], received: []},
        });
        await user.save();

        sendMail(email, name, "signedUp");
        res.status(200).json({
            message: "success",
            user: user,
        });
    } catch (error) {
        next(error);
    }
};


export const postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({email: email});
        let passwordsMatch;
        if (userFound) {
            passwordsMatch = await bcrypt.compare(password, userFound.password);
        }

        if (!userFound || !passwordsMatch) {
            return res.status(409).json({
                "status": "failure",
                "message": "Wrong email/ password.!",
            });
        }

        const token = createToken(email, userFound._id);
        res.status(200).json({
            "status": "success",
            "message": "Logged in successfully!",
            "data": {
                token: token,
                userID: userFound._id,
            }
        });
    } catch(error) {
        next(error);
    }
};


export const postLogout = (req, res, next) => {
    res.status(200).json({
        "status": "success",
        "message": "Logged out successfully!",
    });
};
