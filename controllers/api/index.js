const router = require("express").Router();
const commentRoutes = require("./comment-routes");
const postRoutes = require("./post-routes");
const userRoutes = require("./user-routes");

//Prefix all routes
router.use("/comments", commentRoutes);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);

module.exports = router;