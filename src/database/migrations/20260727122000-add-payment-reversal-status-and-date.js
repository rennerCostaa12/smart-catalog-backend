"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "status_payment",
        [
          {
            name: "ESTORNO EM ANDAMENTO",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "ESTORNO NEGADO",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "ESTORNADO",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );

      await queryInterface.addColumn(
        "payments",
        "payment_reversal_date",
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        { transaction },
      );
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("payments", "payment_reversal_date", {
        transaction,
      });

      await queryInterface.bulkDelete(
        "status_payment",
        { name: ["ESTORNO EM ANDAMENTO", "ESTORNO NEGADO", "ESTORNADO"] },
        { transaction },
      );
    });
  },
};
