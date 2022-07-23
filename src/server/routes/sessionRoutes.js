const { pool } = require("../db");
const uid = new (require("short-unique-id"))();

module.exports = (app) => {
  app.post("/save-session", (req, res) => {
    const { sets, workout } = req.body;

    let values = "";
    const session_id = uid();

    let sets_added = 0;
    // prepare values for SQL statment
    for (let exercise_id of Object.keys(sets)) {
      let count = 1;
      for (let set of sets[exercise_id]) {
        values += `('${uid()}', '${set.weight}', '${
          set.reps
        }', '${exercise_id}', '${session_id}', '${count++}'), `;
        sets_added++;
      }
    }

    values = values.slice(0, -2) + ";";

    if (sets_added == 0) {
      res.status(500).send("No sets were recorded!");
      return;
    }

    const query =
      "BEGIN; " +
      `INSERT INTO session (session_id, user_id, workout_id) 
      VALUES ('${session_id}', '${req.session.user.id}','${workout.workout_id}'); ` +
      `INSERT INTO set (set_id, weight, reps, exercise_id, session_id, set_order) VALUES ${values} ` +
      "COMMIT;";

    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }

      res.status(200).send("Session Added!");
    });
  });

  app.post("/get-session",(req,res)=> {
    const {sessionId} = req.body;
    const query = `SELECT s.workout_id, s.session_time, w.name 
    FROM session as s INNER JOIN workout as w 
    ON s.workout_id = w.workout_id
    WHERE session_id = '${sessionId}'`;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }

      res.json(result.rows);
    });

  })

  app.post("/get-exercise-sets", (req,res)=> {
    const {sessionId,exerciseId} = req.body;
    const query = `SELECT 
    weight, reps, set_order,exercise_id
    FROM
    public.set
    WHERE session_id='${sessionId}' and exercise_id = '${exerciseId}'
    ORDER BY set_order `;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }
      console.log(exerciseId);
      console.log(result.rows);
      res.json(result.rows);
    });
  });
};
