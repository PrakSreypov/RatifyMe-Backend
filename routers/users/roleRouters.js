const express = require("express");
const router = express.Router();

const roleControllers = require("../../controllers/users/roleControllers");

const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.authorizeRole(1), roleControllers.getAll)
    .post(roleControllers.createOne);
router
    .route("/:id")
    .get(roleControllers.getOne)
    .patch(roleControllers.updateOne)
    .delete(roleControllers.deleteOne);

module.exports = router;
