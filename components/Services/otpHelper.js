// Generates and verifies OTP.
const otpHelper = {
    generate: () => {
        return Math.random().toString().split(".")[1].substring(0, 6);
    },
    verify: (generatedOTP, userInputOTP) => {
        return generatedOTP == userInputOTP;
    },
};

export default otpHelper;
