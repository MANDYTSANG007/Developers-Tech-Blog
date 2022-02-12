const router = require("express").Router();
const { post } = require(".");
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
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a post
router.post("/", async(req, res) => {
    try{
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a post
router.put("/:id", async(req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(postData => {
        if(!postData) {
            res.status(404).json({message: "No post found with this id!"});
            return;
        }
        res.status(200).json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a post
router.delete("/:id", async(req, res) =>{
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json ({ message: "No post found with this id!"});
            return;
        }
        res.status(200).json(postData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;








//get post
//create post
//update post
//delete post