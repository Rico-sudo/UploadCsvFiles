const env = {
  database: 'ppl_system',
  username: 'admin',
  password: 'popcorn91',
  host: 'database-1.cvexlsbjwd6j.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 3000000,
    idle: 10000
  }
};
 
module.exports = env;