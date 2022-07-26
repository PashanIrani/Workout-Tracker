const { pool } = require("../db");
const uid = new (require("short-unique-id"))();
const url = require("url");

function getTableNames(type) {
  return {
    table_name:
      type === "BW" ? "weight_log" : type === "FP" ? "fat_percentage" : null,
    value_column_name:
      type === "BW" ? "weight" : type === "FP" ? "percentage" : null,
  };
}
module.exports = (app) => {
  app.get("/get-body-logs", (req, res) => {
    const { type } = req.query;
    const { user } = req.session;

    const { table_name, value_column_name } = getTableNames(type);

    if (table_name === null) {
      res.status(500).send("Can't log type of " + type);
      return;
    }

    pool.query(
      `SELECT * FROM ${table_name} WHERE user_id = $1`,
      [user.id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("SQL Error!");
          return;
        }

        res.status(200).json(
          result.rows.map((row) => ({
            time: row.time,
            value: row[value_column_name],
          }))
        );
      }
    );
  });

  app.post("/save-body-log", (req, res) => {
    const { type, data } = req.body;
    const { user } = req.session;

    const { table_name, value_column_name } = getTableNames(type);

    if (table_name === null) {
      res.status(500).send("Can't log type of " + type);
      return;
    }

    pool.query(
      `INSERT INTO ${table_name} (user_id, bodylog_id, time, ${value_column_name}) VALUES ($1, $2, $3, $4);`,
      [user.id, uid(), data.time, data.value],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("SQL Error!");
          return;
        }

        res.status(200).send("Body Log Added!");
      }
    );
  });
};
