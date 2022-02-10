const router = require("express").Router();
const { User } = require("../../models");

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
//CREATE new user

// Login

// Logout