'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // A blog belongs to a user
            Blog.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'author',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            // A blog belongs to a category
            Blog.belongsTo(models.Category, {
                foreignKey: 'category_id',
                as: 'category',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    Blog.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Title cannot be empty.'},
                len: { args: [3, 255], msg: 'Title must be between 3 and 255 characters.'}
            }
        },
        image: {
            type: DataTypes.STRING,
        },
        tags: {
            type: DataTypes.STRING,
        },
        desc: {
            type: DataTypes.STRING(1234),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Description is required.' },
                len: { args: [10, 1234], msg: 'Description must be at least 10 characters. '},
            }
        },
        long_text: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Category ID must be an integer.' },
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Category ID must be an integer.' },
            }
        }
    }, {
        sequelize,
        modelName: 'Blog',
        tableName: 'Blog'
    });

    return Blog;
};