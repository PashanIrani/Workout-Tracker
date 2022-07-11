const csv = require("csvtojson");
const path = require("path");
const { pool } = require("../db");
const uid = new (require("short-unique-id"))();
const { isNully } = require("../helpers");

module.exports = (app) => {
  app.post("/save-workout", (req, res) => {
    const { workout } = req.body;
    const { user } = req.session;

    if (isNully(workout.name)) {
      res.status(401).send("Incorrect Data Provided!");
      return;
    }

    const workout_id = uid();

    let values = "";

    // prepare values for SQL statment
    for (let i = 0; i < workout.exercises.length; ++i) {
      let exercise_id = workout.exercises[i];

      values +=
        `('${workout_id}', '${exercise_id}', '${i + 1}')` +
        (i == workout.exercises.length - 1 ? ";" : ",");
    }

    const query =
      "BEGIN; " +
      `INSERT INTO workout (workout_id, name, user_id) VALUES ('${workout_id}', '${workout.name}', '${user.id}');` +
      `INSERT INTO workout_exercise (workout_id, exercise_id, exercise_order) VALUES ${values}` +
      "COMMIT;";

    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }

      res.status(200).send("Workout Added!");
    });
  });

  app.post("/edit-workout-name", (req, res) => {
    const { workout } = req.body;

    if (isNully(workout.name)) {
      res.status(401).send("Incorrect Data Provided!");
      return;
    }
    
    // update name if necessary
    const query = `UPDATE PUBLIC.WORKOUT set name = '${workout.name}'`+
    `where workout_id = '${workout.id}' and name <> '${workout.name}'`;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }
    });
  })

  app.post("/edit-workout", (req, res) => {
    const { workout } = req.body;
    const { user } = req.session;

    pool.query(`DELETE FROM PUBLIC.WORKOUT_EXERCISE WHERE WORKOUT_ID = '${workout.id}'`, (err,result)=> {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }
    });

    let values = "";

    // prepare values for SQL statment
    for (let i = 0; i < workout.exercises.length; ++i) {
      let exercise_id = workout.exercises[i];

      values +=
        `('${workout.id}', '${exercise_id}', '${i + 1}')` +
        (i == workout.exercises.length - 1 ? ";" : ",");
    }

    const query = `INSERT INTO workout_exercise (workout_id, exercise_id, exercise_order) VALUES ${values}`

    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }

      res.status(200).send("Workout Edited!");
    });
  });

  app.get("/retrieve-workouts", (req, res) => {
    const { user } = req.session;
    pool.query(
      "SELECT * FROM WORKOUT WHERE user_id = $1;",
      [user.id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("SQL Error!");
          return;
        }
        res.json(result.rows);
      }
    );
  });
};
