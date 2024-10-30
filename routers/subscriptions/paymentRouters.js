const express = require("express");
const router = express.Router();

const paymentControllers = require("../../controllers/subcriptions/paymentControllers");
const authMiddleware = require("../../middlewares/auth");

router.route("/").get(authMiddleware.protect, paymentControllers.getAll);
router.route("/:id").get(authMiddleware.protect, paymentControllers.getOne);

module.exports = router;
