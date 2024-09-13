const express = require("express");
const router = express.Router();

const roleControllers = require("../../controllers/users/roleControllers");
const authMiddlewares = require("../../middlewares/auth");

router
    .route("/")
    .get(authMiddlewares.protect, authMiddlewares.authorizeRole(1), roleControllers.getAll)
    .post(authMiddlewares.protect, roleControllers.createOne);
router
    .route("/:id")
    .get(authMiddlewares.protect, roleControllers.getOne)
    .patch(authMiddlewares.protect, roleControllers.updateOne)
    .delete(authMiddlewares.protect, roleControllers.deleteOne);

module.exports = router;
