import bcrypt from "bcryptjs";

import createUser from "../services/createUser.js";
import { createToken } from "../services/jwtHandler.js";
import findUser from "../services/findUser.js";
import checkInputValidation from "../helpers/checkInputValidation.js";

import sendMail from "../helpers/sendMail.js";
import successResponse from "../helpers/successResponse.js";
import failureResponse from "../helpers/failureResponse.js";


export const postSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const validationMsg = checkInputValidation(name, email, password);
        if (validationMsg !== true) {
            return failureResponse(res, 400, validationMsg);
        }

        if (await findUser({email: email})) {
            return failureResponse(res, 409, "An user with provided email already exists!");
        }
        // Hash password, Create new user and send confirmation mail.
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await createUser(email, name, hashedPassword);
        sendMail(email, name, "signedUp");
        successResponse(res, 200, "Created user!", user);

    } catch (error) {
        next(error);
    }
};


export const postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validationMsg = checkInputValidation("", email, password);
        if (validationMsg !== true) {
            return failureResponse(res, 400, validationMsg);
        }

        const user = await findUser({email: email});
        // Validate user password.
        let passwordsMatch;
        if (user) {
            passwordsMatch = await bcrypt.compare(password, user.password);
        }
        if (!user || !passwordsMatch) {
            return failureResponse(res, 409, "Wrong email/ password!");
        }
        
        const token = await createToken(email, user._id);
        successResponse(res, 200, "Logged in successfully!", {
            token: token,
            userID: user._id,
        });
        
    } catch(error) {
        next(error);
    }
};

export const postLogout = (req, res, next) => {
    successResponse(res, 200, "Logged out successfully!");
};
