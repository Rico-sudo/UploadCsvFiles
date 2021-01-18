var stream = require("stream");

const db = require("../config/db.config.js");
const Customer = db.Customer;
const User = db.User;
const excel = require("exceljs");

const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");

const csv = require("csv-parser");
const users = [];
const customers = [];
exports.uploadFile = (req, res) => {
  try {
    fs.createReadStream(__basedir + "/uploads/" + req.file.filename)

      .pipe(csv(() => {}))
      .on("data", (customer) => {
        const row = Object.values(customer)[0].split("|");
        const transformedRow = {
          cont_id: row[0],
          transaction_id: row[1],
          transaction_date: row[2],
          prod_price_net: row[3],
          prod_id: row[4],
        };
        customers.push(transformedRow);
      })
      .on("end", () => {
        Customer.bulkCreate(customers).then(() => {
          const result = {
            status: "ok",
            filename: req.file.originalname,
            message: "Upload Successfully!",
          };
          res.json(result);
        });
      });
  } catch (error) {
    const result = {
      status: "fail",
      filename: req.file.originalname,
      message: "Upload Error! message = " + error.message,
    };
    res.json(result);
  }
};
exports.uploadUserFile = (req, res) => {
  try {
    fs.createReadStream(__basedir + "/uploads/" + req.file.filename)

      .pipe(csv(() => {}))
      .on("data", (user) => {
        const row = Object.values(user)[0].split("|");
        const transformedRow = {
          cust_num: row[0],
          trans_num: row[1],
          date_of_transaction: row[2],
          price_of_product: row[3],
          id_of_product: row[4],
        };
        users.push(transformedRow);
      })
      .on("end", () => {
        User.bulkCreate(users).then(() => {
          const result = {
            status: "ok",
            filename: req.file.originalname,
            message: "Upload Successfully!",
          };
          res.json(result);
        });
      });
  } catch (error) {
    const result = {
      status: "fail",
      filename: req.file.originalname,
      message: "Upload Error! message = " + error.message,
    };
    res.json(result);
  }
};


/**
 * Upload multiple Excel Files task was for csv but Xls can be processed as well if desired
 *
 * @param {*} req
 * @param {*} res
 */
exports.uploadMultipleFiles = async (req, res) => {
  const messages = [];

  for (const file of req.files) {
    try {
      let filePath = __basedir + "/uploads/" + file.filename;
      let rows = await readXlsxFile(filePath);

      // `rows` is an array of rows
      // each row being an array of cells.
      console.log(rows);

      // Remove Header ROW
      rows.shift();

      let length = rows.length;

      for (let i = 0; i < length; i++) {
        let customer = {
          id: rows[i][0],
          name: rows[i][1],
          address: rows[i][2],
          age: rows[i][3],
        };

        customers.push(customer);
      }

      let uploadResult = await Customer.bulkCreate(customers);

      // It will now wait for above Promise to be fulfilled and show the proper details
      console.log(uploadResult);

      if (!uploadResult) {
        const result = {
          status: "fail",
          filename: file.originalname,
          message: "Can NOT upload Successfully",
        };

        messages.push(result);
      } else {
        const result = {
          status: "ok",
          filename: file.originalname,
          message: "Upload Successfully!",
        };
        messages.push(result);
      }
    } catch (error) {
      const result = {
        status: "fail",
        filename: file.originalname,
        message: "Error -> " + error.message,
      };

      messages.push(result);
    }
  }

  return res.json(messages);
};

exports.downloadFile = (req, res) => {
  Customer.findAll().then((objects) => {
    let length = objects.length;

    for (let i = 0; i < length; i++) {
      let datavalues = objects[i].dataValues;
      let customer = {
        id: datavalues.id,
        name: datavalues.name,
        address: datavalues.address,
        age: datavalues.age,
      };
      customers.push(customer);
    }

  });
};
