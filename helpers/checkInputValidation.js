const checkInputValidation = (name, email, password) => {
    if (name && name.length < 3) {
        return "Name must contain at least 3 letters.";
    }    
    if (password.length < 8) {
        return "Password must contain at least 8 characters.";
    }
    if (!email.match("[^@]+@[^@]+\.[^@]+")) {
        return "Invalid email!";
    }
    return true;
};

export default checkInputValidation;
