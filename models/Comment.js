const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Initialize Comment model by extending off Sequelize's Model Class
class Comment extends Model {}

// Set up fields and rules for Comment model
Comment.init(
    {
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
        },
        comment_text: {
           type: DataTypes.STRING,
           allowNull: false,
        },
        //This column will store a reference of the id of the user that owns this comment
         user_id: {         
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);

module.exports = Comment;