// Contain routes - the homepage and login page
const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ["id", "title", "content", "user_id", "date_created" ],
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "user_id", "post_id"],
                    include: {
                        model: User,
                        attributes: ["name"]
                    }
                }
            ],
        });
        // Serialize data for template
        const posts = postData.map(post => post.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
});

// Render one post 
router.get("/post/:id", async (req, res) =>{
    try {
        const postData = await Post.findByPk(req.params.id, { //const postData = await this.post.findOne(req.params.id,{
            include: [
                {
                    model: User,
                    attributes: ["name"]
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "user_id", "post_id"]
                },
            ],
        });
        const post = postData.get({ plain: true});

        res.render("post", {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
    try{
        //Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"]},
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true});

        res.render("profile", {
            ...user,
            logged_in: true
        });
    } catch (err){
        res.status(500).json(err);
    }
});

// If the user is already logged in, redirect the request to another route
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/"); //res.redirect("/post");
        return;
    }
    res.render("login");
});

// Render sign up 
router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;