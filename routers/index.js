const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const loadRoutes = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);

        // Check if it's a directory
        if (fs.lstatSync(fullPath).isDirectory()) {
            // Log routes loading from folder
            // console.log(`Loading routes from ${fullPath}`);

            // Require the directory's index.js (sub-routes)
            const subRoute = require(path.join(fullPath, "index.js"));

            // Ensure subRoute is a valid router, log the type for debugging
            // console.log(`Type of subRoute for ${file}:`, typeof subRoute);

            // Use the router if it's valid
            if (typeof subRoute === "function") {
                const routeName = `/${file}`; // e.g., "/user" or "/product"
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
