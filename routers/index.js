const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const loadRoutes = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);

        // Check if it's a directory
        if (fs.lstatSync(fullPath).isDirectory()) {

            // Require the directory's index.js (sub-routes)
            const subRoute = require(path.join(fullPath, "index.js"));

            // Use the router if it's valid
            if (typeof subRoute === "function") {
                const routeName = `/${file}`;
                router.use(routeName, subRoute);
            } else {
                console.error(`Error: ${file} does not export a valid router`);
            }
        }
    });
};

// Load routes from 'routers' subdirectories (e.g., 'user', 'product')
loadRoutes(__dirname);

module.exports = router;
