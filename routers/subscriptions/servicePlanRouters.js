const express = require("express");
const servicePlanControllers = require("../../controllers/subcriptions/servicePlanControllers");
const router = express.Router();

router.get("/", servicePlanControllers.getAll);

module.exports = router;
