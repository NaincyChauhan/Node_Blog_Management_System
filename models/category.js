'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Category.hasMany(models.Blog, {
                foreignKey: 'category_id',
                as: 'blogs',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    Category.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        desc: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Category',
    });

    return Category;
};