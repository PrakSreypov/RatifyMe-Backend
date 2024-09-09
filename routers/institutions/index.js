const express = require("express");
const router = express.Router();

const institutionRouters = require("./institutionRouters");

router.use("/institution", institutionRouters);

module.exports = router;
