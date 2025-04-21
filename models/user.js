'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Blog, {
                foreignKey: 'user_id',
                as: 'blogs',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            }
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};