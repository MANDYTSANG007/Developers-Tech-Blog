// Contain routes - the homepage and login page
const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ["id", "title", "content", "user_id" ],
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "user_id", "post_id"],
                }
            ],
        });
        // Serialize data for template
        const posts = postData.map((post) => post.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
});

// If the user is already logged in, redirect the request to another route
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/post");
        return;
    }
    res.render("login");
});

module.exports = router;