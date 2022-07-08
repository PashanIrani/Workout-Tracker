const csv = require("csvtojson");
const path = require("path");
const { pool } = require("../db");

module.exports = (app) => {
  app.get("/get-all-exercises", (req, res) => {
    pool.query("SELECT * FROM Exercise", (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }

      res.json(result.rows);
    });
  });
};
