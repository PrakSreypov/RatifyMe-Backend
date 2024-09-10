const express = require("express");

const badgeClassesControllers = require("../../controllers/issuers/badgeClassControllers");

const router = express.Router();

router.route("/").get(badgeClassesControllers.getAll).post(badgeClassesControllers.createOne);

router
    .route("/:id")
    .get(badgeClassesControllers.getOne)
    .patch(badgeClassesControllers.updateOne)
    .delete(badgeClassesControllers.deleteOne);

module.exports = router;
