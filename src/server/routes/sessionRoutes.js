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
      result.rows[0].session_time = result.rows[0].session_time.toLocaleString();
      res.json(result.rows);
    });

  })

  app.post("/get-session-sets", (req,res)=> {
    const {sessionId,workoutId} = req.body;
    const query = `SELECT we.name, we.exercise_order, we.exercise_id, 
    s.weight, s.reps, s.set_order, s.set_id
    from 
    (SELECT e.name, w.exercise_order, w.exercise_id from
     public.workout_exercise as w
     INNER JOIN
     public.exercise as e on w.exercise_id = e.exercise_id
     where w.workout_id = '${workoutId}'
     ) as we
    INNER JOIN
    public.set as s
    on s.exercise_id = we.exercise_id
    where s.session_id='${sessionId}' 
    order by we.exercise_order,s.set_order `;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }
      
      res.json(result.rows);
    });
  });

  app.post("/get-session-info", (req,res)=> {
    const {sessionId} = req.body;
    const query = `SELECT SUM(weight*reps) as total_weight, COUNT(*) as set_count 
    from public.set where session_id = '${sessionId}'`;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }
      
      res.json(result.rows);
    });
  });


  app.post("/get-all-sessions",(req,res)=>{
    const user_id = req.session.user.id;
    const query = `SELECT s.session_time, s.workout_id, s.session_id, w.name 
     FROM session as s INNER JOIN workout as w ON s.workout_id = w.workout_id WHERE s.user_id = '${user_id}'
     order by s.session_time DESC`;

  
    pool.query(query,(err,result)=>{
      if(err){
      console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }

      const {rows} = result;
      for (let i = 0; i < rows.length; i++){
        result.rows[i].session_time = result.rows[i].session_time.toLocaleString();
      }
      res.json(result.rows)
    });
  });

  // nested aggregation with group-by
  app.post("/get-avg-weight",(req,res)=> {
    const {sessionId} = req.body;
    const query = `SELECT exercise_id,name, TRUNC(SUM(WEIGHT*REPS)/SUM(REPS),2) avg_weight
    FROM (SELECT e.exercise_id,e.name,s.weight,s.reps,s.session_id
         from exercise as e 
         join set as s
         on e.exercise_id = s.exercise_id) as se 
         where se.session_id = '${sessionId}'
    GROUP BY exercise_id,name`;
    pool.query(query, (err, result) => {
      if (err) {
        
      res.json(result.rows);
    });
  });

  // division query: find all exercises that are in all workouts
  app.get("/get-fav-exercise",(req,res) => {
    const query = `SELECT EXERCISE_ID, NAME FROM (
      SELECT w.WORKOUT_ID, e.EXERCISE_ID, e.NAME 
      FROM WORKOUT_EXERCISE as w
      JOIN EXERCISE as e
      ON w.exercise_id = e.exercise_id) as we
      WHERE WORKOUT_ID IN (SELECT WORKOUT_ID FROM WORKOUT)
      GROUP BY EXERCISE_ID, NAME
      HAVING COUNT(*) = (SELECT COUNT(*) FROM WORKOUT)`;
      pool.query(query, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("SQL Error!");
          return;
        }
        res.json(result.rows);
      });
  })
};
