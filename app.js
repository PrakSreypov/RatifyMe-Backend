const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Global Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes

// Handling Unhandled Routes

// Global Error Handling Middleware

module.exports = app;
