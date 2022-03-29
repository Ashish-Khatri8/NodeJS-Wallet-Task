// Generates and verifies OTP.
const otpHelper = {
    generate: () => {
        return Math.random().toString().substring(2, 8);
    },
    verify: (generatedOTP, userInputOTP) => {
        return generatedOTP == userInputOTP;
    },
};

export default otpHelper;
