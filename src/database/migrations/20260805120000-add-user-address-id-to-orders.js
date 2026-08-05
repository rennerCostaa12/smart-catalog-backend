"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        "orders",
        "user_address_id",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "user_address",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        { transaction },
      );

      await queryInterface.addIndex("orders", ["user_address_id"], {
        name: "orders_user_address_id_idx",
        transaction,
      });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("orders", "orders_user_address_id_idx", {
        transaction,
      });

      await queryInterface.removeColumn("orders", "user_address_id", {
        transaction,
      });
    });
  },
};
