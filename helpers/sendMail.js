import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import 'dotenv/config';

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SendGridApiKey,
    }
}));

let templates;
const getTemplate = (userName, msgContent) => { 
    templates = {
        "signedUp": {
            "subject": "Signed Up successfully!",
            "mailContent": `
                <h1>Congratulations ${userName}!</h1>
                <h2>You have successfully signed up for BlazeWallet</h2>
                <h3>You have also received a joining bonus of 1000.</h3>
            `,
        },
        "sentOTP": {
            "subject": "Verify OTP!",
            "mailContent": `
                <h1>Hi ${userName}</h1>
                <h2>Your OTP for admin verification is ${msgContent}</h2>
            `,
        },
        "verifiedOTP": {
            "subject": "OTP verification successfull!",
            "mailContent": `
                <h1>Hi ${userName}</h1>
                <h2>
                    You have successfully veriifed yourself.
                    You are now an admin at BlazeWallet!
                </h2>
            `, 
        },
        "txnSentSuccess": {
            "subject": "Transaction sent successfully!",
            "mailContent": `
                <h1>Hi ${userName}</h1>
                <h2>${msgContent}</h2>
            `, 
        },
        "txnFailure": {
            "subject": "Transaction failed!",
            "mailContent": `
                <h1>Hi ${userName}</h1>
                <h2>${msgContent}</h2>
            `, 
        },
        "txnReceived": {
            "subject": "Transaction received!",
            "mailContent": `
                <h1>Hi ${userName}</h1>
                <h2>${msgContent}</h2>
            `, 
        },
    };
};


const sendMail = async (to, userName, reason, msgContent) => {
    getTemplate(userName, msgContent);
    await transporter.sendMail({
        from: process.env.MailSender,
        to: to,
        subject: templates[reason]["subject"],
        html: templates[reason]["mailContent"],
    });
};

export default sendMail;
