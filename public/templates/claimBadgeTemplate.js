exports.claimBadgetemplate = `

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Badge Issued</title>
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
                    color: #000;
                }
                .content .greeting {
                    font-size: 18px;
                }
                .code-block {
                    background-color: #f0f0f0;
                    color: #000;
                    padding: 24px;
                    text-align: center;
                    border-radius: 4px;
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 1.5px;
                }
                .link-platform,
                .email {
                    text-decoration: none;
                    color: #1a87ec;
                    font-size: 18px;
                }
                .cta-button {
                    display: block;
                    width: 200px;
                    margin: 30px auto;
                    padding: 10px 20px;
                    background-color: #1a87ec;
                    color: #ffffff !important;
                    text-align: center;
                    text-decoration: none;
                    border-radius: 5px;
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
                        <p>
                            <span style="font-size: 20px;">📢 Great news!</span>
                            <br />
                            <br />
                            <strong>{{issuerName}}</strong> has just issued you a
                            new badge 🎖️ in recognition of your achievements. Claim
                            your badge now and showcase your accomplishment!
                        </p>

                        <a href="{{badgeLink}}" class="cta-button"
                            >🚀 Claim Your Badge</a
                        >

                        <p>
                            This badge reflects your hard work and dedication, and
                            it’s ready for you to proudly display!
                            <br /><br />Simply click above to claim it and add it to
                            your achievements. 🏆
                        </p>

                        <p>
                            If you have any questions or need assistance, feel free
                            to reach out to us 📬.
                        </p>
                        <p>Best regards,<br /><b>The RatifyMe Team</b> 🌟</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 RatifyMe. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
    </html>

`;
