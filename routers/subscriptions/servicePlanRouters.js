const express = require("express");
const servicePlanControllers = require("../../controllers/subcriptions/servicePlanControllers");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware.protect, servicePlanControllers.getAllServices);

module.exports = router;
