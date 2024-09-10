const express = require("express");
const router = express.Router();

const institutionRouters = require("./institutionRouters");

router.use("/institutions", institutionRouters);

module.exports = router;
