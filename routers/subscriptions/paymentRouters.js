const express = require("express");
const router = express.Router();

const paymentControllers = require("../../controllers/subcriptions/paymentControllers");
const authMiddlewares = require("../../middlewares/auth");

router.route("/").get(authMiddlewares.protect, paymentControllers.getAll);
router.route("/:id").get(authMiddlewares.protect, paymentControllers.getOne);

module.exports = router;
