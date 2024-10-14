const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
exports.upload = multer({ storage: multer.memoryStorage() });

// Error handling
const AppError = require("./utils/appError");
const globalErrorHandling = require("./utils/errorControllers");

// Import the dynamic route loader
const routers = require("./routers");

const app = express();

// Stripe webhook Middleware raw body
app.use("/api/v1/subscriptions/webhook", express.raw({ type: "application/json" }));

// Global Middleware
app.use(express.json());
const allowedDomains = [
    process.env.CLIENT_BASE_URL, 
    'https://www.ratifyme.digital',   
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow requests with no origin (like curl or mobile apps)
        
        if (allowedDomains.includes(origin)) {
            callback(null, true); // Allow the origin if it's in the allowedDomains list
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, HTTP authentication)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// app.use(cors({ origin: process.env.CLIENT_BASE_URL, credentials: true }));
app.use(cookieParser());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log("cookies req from app", req.cookies);
    next();
});

// Use the dynamically loaded routes
app.use("/api/v1", routers);

// Handling Unhandled Routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// Global Error Handling Middleware
app.use(globalErrorHandling);

module.exports = app;
