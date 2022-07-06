const { pool } = require("../src/server/db");
const fs = require("fs");
const path = require("path");

// SQL Files to run in-order
const FILES = ["create-table-user.sql", 
               "create-table-address.sql",
               "create-table-sponsor.sql",
               "create-table-workout.sql",
               "create-table-fatpercentage.sql",
               "create-table-trainer.sql",
               "create-table-weightlog.sql",
               "create-table-workoutexercise.sql"];

begin(0);

function begin(file_no) {
  if (file_no >= FILES.length) process.exit();

  runSqlFile(path.join(__dirname, `../src/server/queries/db-up/${FILES[file_no]}`))
    .then(() => {
      console.log(`${FILES[file_no]} ✅`);
      begin(file_no + 1);
    })
    .catch(() => {
      console.log(`Stopped at file no: ${file_no}`);
    });
}

function runSqlFile(path) {
  return new Promise((resolve, reject) => {
    pool.query(fs.readFileSync(path).toString(), (err, result) => {
      if (err) {
        console.log(`Error in ${path}: `);
        console.log(err);
        reject();
        return;
      }

      resolve();
    });
  });
}
