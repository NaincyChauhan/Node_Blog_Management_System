'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */

        await queryInterface.bulkInsert('Users', [{
            firstName: "Helana",
            lastName: "Targaryen",
            email: "helana@gmail.com",
            password : "12345678",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: "Aegon",
            lastName: "Targaryen",
            email: "ageon@gmail.com",
            password : "12345678",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: "Rhaenyra",
            lastName: "Targaryen",
            email: "rheanyraqueen@gmail.com",
            password : "12345678",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('Users', null, {});
    }
};
