const express = require("express");
const router = express.Router();

const issuerControllers = require("../../controllers/issuers/issuerControllers");

router.route("/").get(issuerControllers.getAll).post(issuerControllers.createOne);

router
    .route("/:id")
    .get(issuerControllers.getOne)
    .patch(issuerControllers.updateOne)
    .delete(issuerControllers.deleteOne);

module.exports = router;
