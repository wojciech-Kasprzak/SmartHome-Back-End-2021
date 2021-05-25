"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "PCBs",
      [
        {
          id: 1,
          name: "ESP8266-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "ESP8266-02",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "ESP8266-03",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
