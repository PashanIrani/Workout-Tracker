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

  app.post("/retrieve-workout-exercises", (req, res) => {
    const query =
    `SELECT e.name, e.target, e.equipment, e.gif_Url, we.exercise_order from PUBLIC.EXERCISE as e INNER JOIN PUBLIC.WORKOUT_EXERCISE as we ON e.exercise_id = we.exercise_id where we.workout_id = '${req.body.workout.workout_id}' order by we.exercise_order ASC`;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }
      
      
      res.json(result.rows);
    });
  });
};
