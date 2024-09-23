const express = require("express");
const router = express.Router();
const institutionStatsControllers = require("../../controllers/institutions/institutionStatsControllers");

router.route("/").get(institutionStatsControllers.getAllInstitutionStats);

module.exports = router;
