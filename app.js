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
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedDomains.indexOf(origin) !== -1) {
            // If the origin is in the allowed list, allow the request
            callback(null, true);
        } else {
            // Otherwise, reject the request with an error
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
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
