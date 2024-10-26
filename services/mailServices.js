const nodemailer = require("nodemailer");

const { resetPasswordTemplate } = require("../public/templates/resetPasswordTemplate");
const { verifyEmailTemplate } = require("../public/templates/verifyEmailTemplate");
const { recievedBadgeTemplate } = require("../public/templates/recievedBadgeTemplate");
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
            // console.log(`${subject} -  email sent successfully`);
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
            .replace(
                "[FORGOT_PASSWORD_LINK]",
                `${process.env.CLIENT_BASE_URL}/auth/forgot-password`,
            );
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

    /**
     * Send a badge notification email to the earner
     * @param {string} email - Recipient's email
     * @param {string} issuerName - The name of the issuer giving the badge
     * @param {string} badgeLink - The link to view the badge
     * @returns {Promise<void>}
     */
    async sendBadgeToEarner(email, issuerName = "", badgeLink = "") {
        // Check if any value is missing, log it and return early
        if (!email || !issuerName || !badgeLink) {
            console.log("Error: Missing email, issuer name, or badge link data.");
            return;
        }

        try {
            // Replace placeholders, ensuring default values to avoid undefined errors
            const html = recievedBadgeTemplate
                .replace("[Issuer Name]", issuerName || "Unknown Issuer")
                .replace("[LINK_TO_VIEW_BADGE]", badgeLink || "#");

            await this.sendEmail({
                email,
                subject: "Congratulations on Receiving Your Badge!",
                html,
            });

            console.log("Badge email sent successfully.");
        } catch (error) {
            console.log("Error preparing or sending badge email:", error);
            throw error;
        }
    }
}

module.exports = EmailService;
