const express = require("express");
const router = express.Router();

const badgeCriteriaItemsControllers = require("../../controllers/issuers/badgeCriteriaItemControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, badgeCriteriaItemsControllers.getAll)
    .post(authMiddlewares.protect, badgeCriteriaItemsControllers.createOne);

router
    .route("/:id")
    .get(authMiddlewares.protect, badgeCriteriaItemsControllers.getOne)
    .delete(authMiddlewares.protect, badgeCriteriaItemsControllers.deleteOne)
    .patch(authMiddlewares.protect, badgeCriteriaItemsControllers.updateOne);

module.exports = router;
