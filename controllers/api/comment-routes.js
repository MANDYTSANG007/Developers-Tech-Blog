const router = require("express").Router();
const { route } = require(".");
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all comments
router.comment("/", withAuth, async (req, res) => {
    try{
        const commentData = await Comment.findAll({
            include: [
                { 
                    model: User,
                },
                {
                    model: Post,
                    attibutes: ["id", "title", "content"]
                } 
            ],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a comment
route.post("/", async(req, res) => {
    try{
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.status(200).json(commentData);
    } catch (err){
        res.status(400).json(err);
    }
});
// UPDATE a comment
route.put("/:id", async(req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(commentData => {
        if(!commentData){
            res.status(404).json({ message: "No comment found with this id"});
            return;
        }
        res.status(200).json(commentData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a comment
router.delete("/:id", async(req, res) => {
    try{
        const commentData = await Comment.destroy({
            where:{
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!"});
            return;
        }
        res.status(200).json(commentData);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
