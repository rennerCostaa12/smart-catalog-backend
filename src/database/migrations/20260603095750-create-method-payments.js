"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "method_payments",
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
          description: {
            type: Sequelize.STRING,
            allowNull: true,
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
        "method_payments",
        [
          {
            name: "Cartão de Crédito",
            description: "Cartão de Crédito",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "PIX",
            description: "PIX",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("method_payments");
  },
};
