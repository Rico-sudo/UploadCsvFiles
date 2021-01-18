let express = require("express");
let router = express.Router();
const db = require("../config/db.config");
const Gig = require("../../app/models/Gig");
const customer = require("../../app/models/customer.model");
const user = require("../../app/models/user.model");
const { Op, fn } = require("sequelize");

router.get("/", async (req, res) => {
  db.Gig.findAll({
    attributes: ["*", [fn("COUNT", "gigs.final_trans"), "PostCount"]],
  })
    .then((gigs) => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
  //   try {
  //     const result = await db.Gig.query(`
  //       SELECT final_trans, final_cust, count(final_trans)
  //       FROM ppl_system.gigs
  //       GROUP BY final_trans;`);
  //     console.log({ result });
  //   } catch (e) {
  //     console.error(e);
  //   }
});

module.exports = router;
