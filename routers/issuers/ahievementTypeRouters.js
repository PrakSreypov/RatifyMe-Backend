const express = require("express");
const router = express.Router();

const achievementTypesControllers = require("../../controllers/issuers/achievementTypeControllers");

router
    .route("/")
    .get(achievementTypesControllers.getAll)
    .post(achievementTypesControllers.createOne);

router
    .route("/:id")
    .get(achievementTypesControllers.getOne)
    .patch(achievementTypesControllers.updateOne)
    .delete(achievementTypesControllers.deleteOne);

module.exports = router;
