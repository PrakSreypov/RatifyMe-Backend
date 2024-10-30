const express = require("express");
const router = express.Router();

const subcriptionControllers = require("../../controllers/subcriptions/subcriptionControllers");
const authMiddleware = require("../../middlewares/auth");

router.route("/").get(authMiddleware.protect, subcriptionControllers.getAll);

module.exports = router;
