const router = require("express").Router();
const { User, Post } = require("../../models");

// GET users (find all users)
router.get("/", async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// GET one user by his/her id
router.get("/:id", async(req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "content"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text"]
            },
        ]
    }).then(userData => {
        if(!userData) {
            res.status(404).json({message: "No user found with this id!"});
            return;
        }
        res.status(200).json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});





//CREATE a new user
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);
        // Store user data during session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Log in for users
router.post("/login", async (req.res) => {
    try {
        // Verify user
        const userData = await User.findOne({ where: {email: req.body.email }});
        if (!userData){
            res.status(400).json({ message: "Incorrect email or password, please try again"});
            return;
        }
        // Verify user's password
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password, please try again"});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: "You are now logged in! "});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Log out for user
router.post("/logout", async(req.res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;