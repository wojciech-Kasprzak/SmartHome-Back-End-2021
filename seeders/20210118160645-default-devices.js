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
      "Devices",
      [
        {
          id: 1,
          name: "ESP8266-01",
          States_ID: 1,
          Rooms_ID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "ESP8266-02",
          States_ID: 2,
          Rooms_ID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "ESP8266-03",
          States_ID: 3,
          Rooms_ID: 3,
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
