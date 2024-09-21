const express = require("express");
const router = express.Router();
const institutionStatsControllers = require("../../controllers/institutions/institutionStatsControllers"); // Import the controller

router.route("/").get(institutionStatsControllers.getAllInstitutionStats);

module.exports = router;
