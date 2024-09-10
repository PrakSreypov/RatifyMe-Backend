const express = require("express");
const router = express.Router();

const authRouters = require("../../routers/auth/authRouters");

router.use('/', authRouters);

module.exports = router;
