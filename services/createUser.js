import User from "../models/userModel.js";

const createUser = async (email, name, hashedPassword) => {
    const user = new User({
        email: email,
        name: name,
        password: hashedPassword,
        balance: 1000,
        isAdmin: false,
        transactions: {sent: [], received: []},
    });
    await user.save();
    return user;
};

export default createUser;
