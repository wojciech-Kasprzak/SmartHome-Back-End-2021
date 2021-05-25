'use strict';

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
        "Transmitters",
        [
          {
            id: 1,
            name: "Lampka nocna",
            PCBs_ID: 1,
            States_ID: 1,
            Rooms_ID: 1,
            GPIO: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "Gniazdko",
            PCBs_ID: 2,
            States_ID: 2,
            Rooms_ID: 2,
            GPIO: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: "Lampa sufitowa",
            PCBs_ID: 3,
            States_ID: 3,
            Rooms_ID: 3,
            GPIO: 2,
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
  }
};
