"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        "orders",
        "payment_id",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "payments",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        { transaction },
      );

      await queryInterface.addIndex("orders", ["payment_id"], {
        name: "orders_payment_id_idx",
        transaction,
      });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("orders", "orders_payment_id_idx", {
        transaction,
      });

      await queryInterface.removeColumn("orders", "payment_id", {
        transaction,
      });
    });
  },
};
