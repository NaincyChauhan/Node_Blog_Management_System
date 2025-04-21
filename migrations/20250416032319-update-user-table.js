'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Users', 'email', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        });

        await queryInterface.addColumn('Users', 'profile_image', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.addColumn('Users', 'password', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Users', 'email',{
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
        });

        await queryInterface.removeColumn('Users', 'profile_image');
        await queryInterface.removeColumn('Users', 'password');
    }
};
