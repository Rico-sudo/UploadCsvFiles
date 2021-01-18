const db = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    cont_id: {
      type: Sequelize.STRING,
    },
    transaction_id: {
      type: Sequelize.STRING,
    },
    transaction_date: {
      type: Sequelize.STRING,
    },
    prod_price_net: {
      type: Sequelize.STRING,
    },

    prod_id: {
      type: Sequelize.STRING,
    },
  });
  

  return Customer;
};
