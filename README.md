
## Deployment

In this project we use AWS as our main host Deployment Provider to Host and Deploy our project. as of this deployment so we actually learn how to deploy and host. we use service such as VPC, EC2, and AMIs. 

as our project goes we use AMAZON LINUX for easy and noncomplex installation.

```bash
  npm run prod:pm2
  sudo systemctl eable nginx
  sudo systemctl start nginx
  sudo systemctl status nginx
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend
`PORT`
`NODE_ENV`
`DB_NAME`
`DB_USER`
`DB_PASSWORD`
`DB_HOST`
`DB_DIALECT`
`JWT_SECRET`
`JWT_EXPIRES_IN`
`JWT_COOKIE_EXPIRES_IN`
`EMAIL_USERNAME`
`EMAIL_PASSWORD`
`EMAIL_HOST`
`EMAIL_PORT`
`SENDER_NAME`
`SENDER_EMAIL_ADDRESS`
`CLIENT_BASE_URL`
`STRIPE_SECRET_KEY`
`STRIPE_CLI_ACC`
`STRIPE_WEBHOOK_SECRET_KEY`
`AWS_BUCKET_NAME`
`AWS_BUCKET_REGION`
`AWS_ACCESS_KEY`
`AWS_SECRET_ACCESS_KEY`

## Demo

as our project is ready to be deploy this is the link to Demo our Project Showcase.

[RatifyMe Digital](www.ratifyme.digital)
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


## Tech Stack

**Client:** React, Node, MUi

**Server:** Node, Express, MySQL

**Dependecies:** 
`aws-sdk (^2.1691.0):` SDK for integrating with AWS services.
`bcryptjs (^2.4.3):` For hashing passwords (used in authentication).
`cookie-parser (^1.4.6):` To parse cookies in HTTP requests.
`cors (^2.8.5):` Enables Cross-Origin Resource Sharing.
`crypto-js (^4.2.0):` Library for encryption and hashing.
`dotenv (^16.4.5):` Loads environment variables from a .env file.
`express (^4.19.2):` Web framework for Node.js to create APIs or web apps.
`helmet (^7.1.0):` For securing Express apps by setting various HTTP headers.
`jsonwebtoken (^9.0.2):` For creating and verifying JSON Web Tokens (JWT) for authentication.
`morgan (^1.10.0):` HTTP request logger middleware for Node.js.
`multer (^1.4.5-lts.1):` Middleware for handling multipart/form-data, primarily for file uploads.
`mysql2 (^3.11.0):` MySQL client for Node.js, supports prepared statements.
`nodemailer (^6.9.15):` For sending emails.
`nodemon (^3.1.4):` Tool to automatically restart the server when file changes are detected (dev use).
`pdfkit (^0.15.0):` For generating PDFs programmatically.
`sequelize (^6.37.3):` ORM (Object-Relational Mapper) to interact with SQL databases.
`sharp (^0.33.5):` High-performance image processing library.
`stripe (^16.12.0):` Library for interacting with the Stripe API for payments.
`uuid (^10.0.0):` For generating unique identifiers (UUIDs).

## Project Structure

```Bash
verifyme-backend/
├── configs/
│   └── <JS files>
├── controllers/
│   ├── auth/
│   │   └── <JS files>
│   ├── earners/
│   │   └── <JS files>
│   ├── institutions/
│   │   └── <JS files>
│   ├── issuers/
│   │   └── <JS files>
│   ├── subscriptions/
│   │   └── <JS files>
│   └── users/
│       └── <JS files>
├── data/
│   └── <JS files>
├── middlewares/
│   └── <JS files>
├── models/
│   └── <JS files>
├── node_modules/
│   └── <JS files>
├── public/
│   └── <JS files>
├── routers/
│   ├── auth/
│   │   └── <JS files>
│   ├── earners/
│   │   └── <JS files>
│   ├── institutions/
│   │   └── <JS files>
│   ├── issuers/
│   │   └── <JS files>
│   ├── subscriptions/
│   │   └── <JS files>
│   ├── users/
│   │   └── <JS files>
│   └── <JS files>
├── services/
│   └── <JS files>
├── utils/
│   ├── auth/
│   │   └── <JS files>
│   └── <JS files>
├── .editorconfig
├── .env
├── .gitignore
├── .gitlab-ci.yml
├── .prettierrc
├── app.js
├── package-lock.json
├── package.json
├── README.md
└── server.js
```