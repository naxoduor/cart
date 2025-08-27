import Sequelize from 'sequelize';
import sequelize from '../config/database.js'
'use strict';
  const ShippingRegion = sequelize.define('shipping_region', {
    shipping_region_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    shipping_region: Sequelize.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  // shipping_region.associate = function (models) {
  //   // associations can be defined here
  // };
  export default ShippingRegion;

