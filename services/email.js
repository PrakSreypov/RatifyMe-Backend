const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIl_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Define the email options
    const mailOptions = {
        from: "VerifyMe <VerifyMe@gmail.io>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
