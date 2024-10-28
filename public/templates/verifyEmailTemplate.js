exports.verifyEmailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verify Your Email</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
            />
            <style>
                body {
                    font-family: "Roboto", sans-serif;
                    background-color: #f6f9fa;
                    margin: 0;
                    padding: 0;
                    color: #000;
                }
                .box {
                    background-color: #f6f9fa;
                    width: 100%;
                    display: flex;
                    align-items: center;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    max-height: 700px;
                    margin: 20px auto;
                    background-color: #fff;
                    border-radius: 12px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    padding: 24px 40px;
                }
                .header {
                    padding: 24px;
                    border-radius: 8px 8px 0 0;
                    color: #ffffff;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #000
                }
                .content .greeting {
                    font-size: 18px;
                }

                .link-platform,
                .email {
                    text-decoration: none;
                    color: #1a87ec;
                    font-size: 18px;
                }

                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #999999;
                }
            </style>
        </head>
        <body>
            <div class="box">
                <div class="container">
                    <div class="header">
                        <img
                            src="https://ratifyme.s3.ap-southeast-2.amazonaws.com/Logo/RatfiyME.png"
                            width="40%"
                        />
                    </div>
                    <div class="content">
                        <p class="greeting">Dear, <span>[FIRSTNAME] [LASTNAME].</span></p>
                        <p >
                            Thank you for signing up on <span class="link-platform">RatifyMe</span>.
                        </p>
                        <p>Enter the code on the verification page to complete your registration.</p>
                        <p>Your verification code is:</p>
                        <div
                            style="
                                text-align: center;
                                margin: 30px 0;
                                background-color: #F4F4F4;
                                padding: 20px;
                            "
                        >
                            <span
                                style="
                                    font-size: 48px;
                                    font-weight: bold;
                                    letter-spacing: 5px;
                                    color: #1a87ec;
                                "
                                >[VERIFICATION_CODE]</span
                            >
                        </div>
                        <p>This code will expire in 15 minutes for security reasons.</p>
                        <p>If you didn't create an account with us, please ignore this email.</p>
                        <p>Best regards,<br /><b>The RatifyMe Team</b></p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 RatifyMe. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
    </html>


`;
