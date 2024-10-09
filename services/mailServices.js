const nodemailer = require("nodemailer");

const { resetPasswordTemplate } = require("../public/templates/resetPasswordTemplate");
const { verifyEmailTemplate } = require("../public/templates/verifyEmailTemplate");
class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: Number(process.env.EMAIL_PORT) === 465,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        this.sender = {
            name: process.env.SENDER_NAME,
            address: process.env.SENDER_EMAIL_ADDRESS,
        };
    }

    /**
     * Generic method to send an email
     * @param {string} email - Recipient's email address
     * @param {string} subject - Email subject
     * @param {string} html - HTML content for the email
     * @returns {Promise<void>}
     */
    async sendEmail({ email, subject, html }) {
        const mailOptions = {
            from: this.sender,
            to: email,
            subject,
            html,
        };

        try {
            const response = await this.transporter.sendMail(mailOptions);
            console.log(`${subject} -  email sent successfully`);
            return response;
        } catch (error) {
            console.error(`Error sending ${subject} email`, error);
            throw new Error(`Error sending ${subject} email: ${error.message}`);
        }
    }

    /**
     * Send a verification email
     * @param {string} email - Recipient's email
     * @param {string} verificationToken - Verification token
     */
    async sendVerificationEmail(email, verifyDigitNum, firstName, lastName) {
        const html = verifyEmailTemplate
            .replace("[VERIFICATION_CODE]", verifyDigitNum)
            .replace("[FIRSTNAME]", firstName)
            .replace("[LASTNAME]", lastName);
        return await this.sendEmail({
            email,
            subject: "Verify your email",
            html,
        });
    }

    /**
     * Send a welcome email
     * @param {string} email - Recipient's email
     * @param {string} name - Recipient's name
     */
    async sendWelcomeEmail(email, name) {
        const html = `<p>Welcome ${name},<br/>Thank you for joining RatifyMe!</p>`;
        await this.sendEmail({
            email,
            subject: "Welcome to RatifyMe",
            html,
        });
    }

    /**
     * Send a password reset email
     * @param {string} email - Recipient's email
     * @param {string} resetURL - Password reset URL
     */
    async sendPasswordResetEmail(email, resetURL) {
        const html = resetPasswordTemplate
            .replace("[RESET_PASSWORD_LINK]", resetURL)
            .replace("[EMAIL_RESET_PASSWORD]", email)
            .replace("[FORGOT_PASSWORD_LINK]", `${process.env.CLIENT_BASE_URL}/forgot-password`);
        await this.sendEmail({
            email,
            subject: "Reset your password",
            html,
        });
    }

    /**
     * Send invite code email
     * @param {string} email - Recipient's email
     * @param {string} html - HTML content (invite code email template)
     */
    async sendInviteCode(email, html) {
        await this.sendEmail({
            email,
            subject: "Invitation to Join Badge Platform",
            html,
        });
    }
}

// Export the EmailService class instead of the instantiated object
module.exports = EmailService;
