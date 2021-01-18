module.exports = (sequelize, Sequelize) => {
  const Gig = sequelize.define("gig", {
    final_cust: {
      type: Sequelize.STRING,
    },
    final_trans: {
      type: Sequelize.STRING,
    },
    final_date: {
      type: Sequelize.STRING,
    },
    final_price: {
      type: Sequelize.STRING,
    },
    final_prod_id: {
      type: Sequelize.STRING,
    },
  });

  return Gig;
};
