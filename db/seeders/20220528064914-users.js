"use strict";

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Role } = require("../../app/models");

const names = ["Johnny", "Fikri", "Brian", "Ranggawarsita", "Jayabaya"];

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123456";
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    const customerRole = await Role.findOne({
      where: {
        name: "CUSTOMER",
      },
    });

    const adminRole = await Role.findOne({
      where: {
        name: "ADMIN",
      },
    });

    const customerUsers = names.map((name) => ({
      name,
      email: `${name.toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: customerRole.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    const adminUsers = [
      {
        name: "AdminUser1",
        email: "adminuser1@binar.co.id",
        encryptedPassword,
        roleId: adminRole.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      {
        name: "AdminUser2",
        email: "adminuser2@binar.co.id",
        encryptedPassword,
        roleId: adminRole.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const allUsers = [...customerUsers, ...adminUsers];
    await queryInterface.bulkInsert("Users", allUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { name: { [Op.in]: names } }, {});
  },
};
