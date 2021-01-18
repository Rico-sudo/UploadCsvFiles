const db = require("../config/db.config");


module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    cust_num: {
      type: Sequelize.STRING,
    },
    trans_num: {
      type: Sequelize.STRING,
    },
    date_of_transaction: {
      type: Sequelize.STRING,
    },
    price_of_product: {
      type: Sequelize.STRING,
    },
    id_of_product: {
      type: Sequelize.STRING,
    },
  });

 
  return User;
};
