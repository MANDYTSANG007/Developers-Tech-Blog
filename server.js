// Import dependencies
const express = require("express");
const session = require("express-session");
const path = require("path");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Create session
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.bodyParser());
app.use(express.json());
app.use(session(sess));

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// Import handlebars
// Set up handlebars engine with custom helpers
const exphbs = require("express-handlebars");
const hbs = exphbs.create({helpers});

// Set handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Turn on routes
app.use(routes);

// Turn on connection to the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
