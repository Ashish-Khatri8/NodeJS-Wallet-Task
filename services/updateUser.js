const updateUser = async (user, key, value) => {
    if (Array.isArray(key)) {
        // Updating user transactions.
        user[key[0]][key[1]].push(value);
    } else {
        user[key] = value;
    }
    return await user.save();
};

export default updateUser;
