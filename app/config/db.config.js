const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.User=require('../models/user.model.js')(sequelize, Sequelize);
db.Gig = require('../../app/models/Gig')(sequelize , Sequelize);

db.Customer.beforeBulkCreate((customers, options) => {
  console.log("customer");
  for (const customer of customers) {
    db.Gig.bulkCreate([{
      final_cust: customer.cont_id,
      final_trans: customer.transaction_id,
      final_date: customer.transaction_date,
      final_price: customer.prod_price_net,
      final_prod_id: customer.prod_id,
    }]);
  }
});
db.User.beforeBulkCreate((users, options) => {
  console.log("users");
  users.forEach((user) => {
    const gig = {
      final_cust: user.cust_num,
      final_trans: user.trans_num,
      final_date: user.date_of_transaction,
      final_price: user.price_of_product,
      final_prod_id: user.id_of_product,
    };
    db.Gig.bulkCreate([gig]);
  });
});


module.exports = db;