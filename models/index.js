const User = require("./User");
const Post = require('./Post');
const Comment = require("./Comment");


//user can make many posts

// user can make many comments

// post only belongs to one user

// post can have many comments

//comment only belongs to one user

//comment only belongs to one post



module.exports = { User, Post, Comment};