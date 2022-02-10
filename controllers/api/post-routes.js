const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all posts
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                { 
                    model: User,
                },
                { 
                    model: Comment, 
                    attributes: ["id", "comment_text"]
                },
            ],
        });
        res.status(200).json(postData);
    } catch (err){
        res.status(500).json(err);
    }
});

// GET a single post
router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findOne({
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text"]
                },
            ],
        });
        res.status(200).json(postDate);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a post










//get post
//create post
//update post
//delete post