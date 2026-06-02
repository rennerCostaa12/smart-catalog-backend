"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "categories_products",
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
        "categories_products",
        [
          {
            name: "Eletrônicos",
            description: "Eletrônicos",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Acessórios",
            description: "Acessórios",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Casa",
            description: "Casa",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Escritório",
            description: "Escritório",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction },
      );
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("categories_products");
  },
};
