const express = require("express");
const app = express();

const db = require("./app/config/db.config.js");

global.__basedir = __dirname;

const isForced = false;
// force: true will drop the table if it already exists
db.sequelize.sync({ force: isForced }).then(() => {
  console.log(`Drop and Resync with { force: ${isForced} }`);
});

let router = require("./app/routers/excel.router.js");
app.use(express.static("resources"));
app.use("/", router);

//gig routes

app.use("/gigs", require("./app/routers/gigs"));
// app.use('/user', require('./app/routers/user'));

// Create a Server
const server = app.listen(3030, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
