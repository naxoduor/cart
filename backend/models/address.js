'use strict';
import sequelize from "../config/database.js";
import Sequelize from "sequelize";

const Address = sequelize.define('address', {
    address_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    name: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    postal_address: Sequelize.STRING,
    email: Sequelize.STRING,
    order_id: Sequelize.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Address;
