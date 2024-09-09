const express = require("express");

const issuerControllers = require("../../controllers/issuers/issuerControllers");
const router = express.Router();

router.route("/").get(issuerControllers.getAll).post(issuerControllers.createOne);

router
    .route("/:id")
    .get(issuerControllers.getOne)
    .patch(issuerControllers.updateOne)
    .delete(issuerControllers.deleteOne);

module.exports = router;
