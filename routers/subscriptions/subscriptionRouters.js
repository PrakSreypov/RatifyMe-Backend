const express = require("express");
const router = express.Router();

const subcriptionControllers = require("../../controllers/subcriptions/subcriptionControllers");
const authMiddlewares = require("../../middlewares/auth");

router.route("/").get(subcriptionControllers.getAll);

module.exports = router;
