const express = require("express");
const router = express.Router();

const badgeCriteriaItemsControllers = require("../../controllers/issuers/badgeCriteriaItemControllers");

router
    .route("/")
    .get(badgeCriteriaItemsControllers.getAll)
    .post(badgeCriteriaItemsControllers.createOne);

router
    .route("/:id")
    .get(badgeCriteriaItemsControllers.getOne)
    .delete(badgeCriteriaItemsControllers.deleteOne)
    .patch(badgeCriteriaItemsControllers.updateOne);

module.exports = router;
