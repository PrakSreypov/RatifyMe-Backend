## RatifyME Project

RatifyME is a startup project to showcase our Fullstack Skill after we finished our course on Fullstack development. We will devote our time and commitment to this project to show how skillful we are in order to build a Fullstack web app. RatifyME is ideally a place where learner can come to claim their achievement such as E-Certificate and E-Badge that contain their metadata such as Their Achievement, Exam/test score, and activities to obtain their E-Certificate or E-Badge and it is secure that can confirm it authentic Certificate/Badge that issue by Organization/Institution.

## Table of Contents
- [RatifyME Project](#ratifyme-project)
- [Table of Contents](#table-of-contents)
    - [RatifyME: Showcase Your Digital Achievements with Confidence](#ratifyme-showcase-your-digital-achievements-with-confidence)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Dependecies:](#dependecies)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
  - [Backend](#backend)
- [Run Locally](#run-locally)
- [Deployment](#deployment)
- [Contribution](#contribution)

#### RatifyME: Showcase Your Digital Achievements with Confidence

Ready to turn your hard-earned skills and accomplishments into verifiable digital credentials? **RatifyME** is your go-to platform for earning and showcasing E-Certificates and E-Badges, complete with the metadata that matters: test scores, achievements, and the activities that helped you get there.

**Why Choose RatifyME?**

- **Professional & Personalized:** Tailor your digital credentials to reflect your unique journey and accomplishments.
- **Secure & Verified:** Rest easy knowing your achievements are backed by a trusted and tamper-proof verification system.
- **Effortless Sharing:** Seamlessly share your digital badges and certificates across social media and professional networks with just a click.

Join **RatifyME** today and take your achievements from hidden to highlighted—letting the world recognize your dedication and success!


## Demo

as our project is ready to be deploy this is the link to Demo our Project Showcase.
[RatifyMe Digital - www.ratifyme.digital](www.ratifyme.digital) 
[RatifyMe Digital - tech-a.anbschool.org](tech-a.anbschool.org) 

## Tech Stack

**Client:** React, Node, MUi

**Server:** Node, Express, MySQL

## Dependecies: 
- **aws-sdk**: `^2.1691.0` - SDK for integrating with AWS services.
- **bcryptjs**: `^2.4.3` - For hashing passwords (used in authentication).
- **cookie-parser**: `^1.4.6` - To parse cookies in HTTP requests.
- **cors**: `^2.8.5` - Enables Cross-Origin Resource Sharing.
- **crypto-js**: `^4.2.0` - Library for encryption and hashing.
- **dotenv**: `^16.4.5` - Loads environment variables from a .env file.
- **express**: `^4.19.2` - Web framework for Node.js to create APIs or web apps.
- **helmet**: `^7.1.0` - For securing Express apps by setting various HTTP headers.
- **jsonwebtoken**: `^9.0.2` - For creating and verifying JSON Web Tokens (JWT) for authentication.
- **morgan**: `^1.10.0` - HTTP request logger middleware for Node.js.
- **multer**: `^1.4.5-lts.1` - Middleware for handling multipart/form-data, primarily for file uploads.
- **mysql2**: `^3.11.0` - MySQL client for Node.js, supports prepared statements.
- **nodemailer**: `^6.9.15` - For sending emails.
- **nodemon**: `^3.1.4` - Tool to automatically restart the server when file changes are detected (dev use).
- **pdfkit**: `^0.15.0` - For generating PDFs programmatically.
- **sequelize**: `^6.37.3` - ORM (Object-Relational Mapper) to interact with SQL databases.
- **sharp**: `^0.33.5` - High-performance image processing library.
- **stripe**: `^16.12.0` - Library for interacting with the Stripe API for payments.
- **uuid**: `^10.0.0` - For generating unique identifiers (UUIDs).


## Project Structure

```Bash
verifyme-backend/ 
├── configs/                        # Static assets (images, fonts, etc.)
│   └── database.js
│   └── <JS files>
├── controllers/                    # Controller                   
│   ├── auth/
│   │   └── authControllers.js
│   │   └── <JS files>
│   ├── earners/
│   │   └── academicBackgroundControllers.js
│   │   └── <JS files>
│   ├── institutions/
│   │   └── insituImageControllers.js
│   │   └── <JS files>
│   ├── issuers/
│   │   └── achievementControllers.js
│   │   └── <JS files>
│   ├── subscriptions/
│   │   └── checkoutControllers.js
│   │   └── <JS files>
│   └── users/
│   │   └── addressControllers.js
│       └── <JS files>
├── data/                           # Static data and constants
│   └── academicBackgroundData.js
│   └── <JS files>
├── middlewares/                    # Middlewares configuration
│   └── auth.js
│   └── <JS files>
├── models/                         # Model configuration
│   └── AcademicBackgrounds.js
│   └── <JS files>
├── node_modules/
│   └── <JS files>
├── public/                         # Public Configuration
│   └── assets
│   │   └── image
│   │       └── Ratifyme-logo.svg                        
│   └── templates
│       └── inviteCodeTemplate.js    
├── routers/                        # Routing configuration
│   ├── auth/
│   │   └── index.js
│   │   └── <JS files>
│   ├── earners/
│   │   └── index.js
│   │   └── <JS files>
│   ├── institutions/
│   │   └── index.js
│   │   └── <JS files>
│   ├── issuers/
│   │   └── <JS files>
│   │   └── index.js
│   ├── subscriptions/
│   │   └── index.js
│   │   └── <JS files>
│   ├── users/
│   │   └── index.js
│   │   └── <JS files>
│   └── <JS files>
├── services/                       # Services configuration
│   └── codeInvitationServices.js
│   └── <JS files>
├── utils/                          # Utils configuration
│   ├── auth/
│   │   └── generateVerificationCode.js
│   │   └── <JS files>
│   └── apiFeature.js
│   └── <JS files>
├── .editorconfig                   # Editor configuration
├── .env                            # Environment variables
├── .gitignore                      # Git ignore rules
├── .gitlab-ci.yml                  # GitLab CI/CD configuration
├── .prettierrc                     # Prettier configuration
├── app.js                          # App configuration
├── package-lock.json               # Dependency lock file
├── package.json                    # Project dependencies and scripts
├── README.md                       # Project documentation
└── server.js                       # Server configuration
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend
***Global Config***

`PORT`

`NODE_ENV`

***Database Config***

`DB_NAME`

`DB_USER`

`DB_PASSWORD`

`DB_HOST`

`DB_DIALECT`

***JWT Config***

`JWT_SECRET`

`JWT_EXPIRES_IN`

`JWT_COOKIE_EXPIRES_IN`

***Nodemailer Config***

`EMAIL_USERNAME`

`EMAIL_PASSWORD`

`EMAIL_HOST`

`EMAIL_PORT`

`SENDER_NAME`

`SENDER_EMAIL_ADDRESS`

***Cors Config***

`CLIENT_BASE_URL`

***STRIPE Config***

`STRIPE_SECRET_KEY`

`STRIPE_CLI_ACC`

`STRIPE_WEBHOOK_SECRET_KEY`

***S3 Config***

`AWS_BUCKET_NAME`

`AWS_BUCKET_REGION`

`AWS_ACCESS_KEY`

`AWS_SECRET_ACCESS_KEY`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd verifyme-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Deployment

In this project we use AWS as our main host Deployment Provider to Host and Deploy our project. as of this deployment so we actually learn how to deploy and host. we use service such as VPC, EC2, and AMIs. 

as our project goes we use AMAZON LINUX for easy and noncomplex installation.

```bash
  npm run prod:pm2
  sudo systemctl eable nginx
  sudo systemctl start nginx
  sudo systemctl status nginx
```

## Contribution
-   1 Prak Sreypov
-   2 Phok Keomonnyratanak
-   3 Samon Rotha
-   4 Ly Diyamong
-   5 Khun Malen
-   6 Sreang Lyhour
-   7 Rorn Bunthong
-   8 Tep Chounan