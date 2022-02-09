// Import dependencies
const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");

// Import handlebars
// Set up handlebars engine with custom helpers
const exphbs = require("express-handlebars");
const hbs = exphbs.create({helpers});

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Turn on routes
app.use(routes);

// Turn on connection to the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
