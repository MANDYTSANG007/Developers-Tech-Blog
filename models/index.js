const User = require("./User");
const Post = require('./Post');
const Comment = require("./Comment");


//user can make many posts
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});
// user can make many comments
User.hasMany(Comment, {
    foreignKey: "user_id",
})
// post only belongs to one user
Post.belongsTo(User, {
    foreignKey: "user_id"
})
// post can have many comments
Post.hasMany(Comment, {
    foreignKey: "post_id"
})
//comment only belongs to one user
Comment.belongsTo(User, {
    foreignKey: "user_id"
})
//comment only belongs to one post
Comment.belongsTo(Post, {
    foreignKey: "post_id"
})


module.exports = { User, Post, Comment};