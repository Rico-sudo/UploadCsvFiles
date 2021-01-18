let express = require("express");
let router = express.Router();
const db = require("../config/db.config");
const { fn, col } = require("sequelize");
const _ = require("lodash");

const consoleSeparator = () => console.log("\n================\n");

router.get("/", async (req, res) => {
  try {
    const gigs = await db.Gig.findAll({
      attributes: ["*", [fn("COUNT", col("final_trans")), "transCount"]],
      group: ["final_trans"],
      raw: true,
    })

    const excludedTransactions = gigs.filter(
      ({ transCount }) => transCount === 1
    );

    const groupedByCustomers = Object.values(
      _.groupBy(excludedTransactions, "final_cust")
    ).filter((gigs) => gigs.length > 0);

    groupedByCustomers.forEach((gigs) =>
      console.log(
        `Customer ${gigs[0].final_cust} has ${gigs.length} transactions`
      )
    );

    consoleSeparator();

    const averageTransaction = groupedByCustomers.map((gigs) => {
      const count = gigs.length;
      const sum = gigs.reduce((total, gig) => (total += gig.final_price), 0);
      const average = parseInt(sum / count);

      const result = { ...gigs[0], average };

      // Output
      console.log(
        `Customer ${result.final_cust} has an average of ${result.average} per transaction`
      );

      return result;
    });

    consoleSeparator();

    console.log(`Number of customers: ${groupedByCustomers.length}`);

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
