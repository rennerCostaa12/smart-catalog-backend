"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "status_payment",
        {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn("NOW"),
          },
        },
        { transaction },
      );

      await queryInterface.bulkInsert(
        "status_payment",
        [
          {
            name: "PENDENTE",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "PAGO",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "CANCELADO",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("status_payment");
  },
};
