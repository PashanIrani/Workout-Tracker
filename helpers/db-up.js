const { pool } = require("../src/server/db");
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

// SQL Files to run in-order
const FILES = [
  "create-table-address.sql",
  "create-table-gym.sql",
  "create-table-user.sql",
  "create-table-exercise.sql",
  "create-table-sponsor.sql",
  "create-table-workout.sql",
  "create-table-fatpercentage.sql",
  "create-table-trainer.sql",
  "create-table-weightlog.sql",
  "create-table-workoutexercise.sql",
  "create-table-session.sql",
  "create-table-set.sql",
  populateExerciseTable,
  populateAddressTable,
  populateGymTable,
  populateSponsorTable,
  populateTrainerTable,
];

begin(0);

function begin(file_no) {
  if (file_no >= FILES.length) process.exit();

  if (typeof FILES[file_no] === "function") {
    FILES[file_no]()
      ?.then(() => nextAction(file_no))
      ?.catch(() => actionError(file_no));
  } else {
    runSqlFile(
      path.join(__dirname, `../src/server/queries/db-up/${FILES[file_no]}`)
    )
      .then(() => nextAction(file_no))
      .catch(() => actionError(file_no));
  }
}

function nextAction(file_no) {
  console.log(
    `${
      typeof FILES[file_no] === "function"
        ? FILES[file_no].name
        : FILES[file_no]
    } ✅`
  );
  begin(file_no + 1);
}

function actionError(file_no) {
  console.log(`Stopped at file no: ${file_no}`);
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

function populateExerciseTable() {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path.join(__dirname, "../public/data/exercises.csv"))
      .then((data) => {
        let values = "";

        for (let i = 0; i < data.length; ++i) {
          let { id, name, target, equipment, gifUrl } = data[i];

          values +=
            `('${id}', '${name}', '${target}', '${equipment}', '${gifUrl}')` +
            (i == data.length - 1 ? ";" : ",");
        }

        const query = `INSERT INTO Exercise (exercise_id, name, target, equipment, gif_url) VALUES ${values}`;

        pool.query(query, (err, result) => {
          if (err) {
            console.log(`Error in ${path}: `);
            console.log(err);
            reject();
            return;
          }

          resolve();
        });
      });
  });
}

function populateAddressTable() {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path.join(__dirname, "../public/data/address.csv"))
      .then((data) => {
        let values = "";

        for (let i = 0; i < data.length; ++i) {
          let { postal_code, city, province } = data[i];

          values +=
            `('${postal_code}', '${city}', '${province}')` +
            (i == data.length - 1 ? ";" : ",");
        }

        const query = `INSERT INTO Address (postal_code, city, province) VALUES ${values}`;

        pool.query(query, (err, result) => {
          if (err) {
            console.log(`Error in ${path}: `);
            console.log(err);
            reject();
            return;
          }

          resolve();
        });
      });
  });
}

function populateGymTable() {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path.join(__dirname, "../public/data/gyms.csv"))
      .then((data) => {
        let values = "";

        for (let i = 0; i < data.length; ++i) {
          let { gym_id, name, street_address, postal_code } = data[i];

          values +=
            `('${gym_id}', '${name}', '${street_address}', '${postal_code}')` +
            (i == data.length - 1 ? ";" : ",");
        }

        const query = `INSERT INTO Gym (gym_id, name, street_address, postal_code) VALUES ${values}`;

        pool.query(query, (err, result) => {
          if (err) {
            console.log(`Error in ${path}: `);
            console.log(err);
            reject();
            return;
          }

          resolve();
        });
      });
  });
}

function populateSponsorTable() {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path.join(__dirname, "../public/data/sponsor.csv"))
      .then((data) => {
        let values = "";

        for (let i = 0; i < data.length; ++i) {
          let { name, website_url } = data[i];

          values +=
            `('${name}', '${website_url}')` +
            (i == data.length - 1 ? ";" : ",");
        }

        const query = `INSERT INTO Sponsor (name, website_url) VALUES ${values}`;

        pool.query(query, (err, result) => {
          if (err) {
            console.log(`Error in ${path}: `);
            console.log(err);
            reject();
            return;
          }

          resolve();
        });
      });
  });
}

function populateTrainerTable() {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path.join(__dirname, "../public/data/trainer.csv"))
      .then((data) => {
        let values = "";

        for (let i = 0; i < data.length; ++i) {
          let { trainer_id, name, gym_id, sponsor } = data[i];

          values +=
            `('${trainer_id}', '${name}', '${gym_id}', '${sponsor}')` +
            (i == data.length - 1 ? ";" : ",");
        }

        const query = `INSERT INTO Trainer (trainer_id, name, gym_id, sponsor) VALUES ${values}`;

        pool.query(query, (err, result) => {
          if (err) {
            console.log(`Error in ${path}: `);
            console.log(err);
            reject();
            return;
          }

          resolve();
        });
      });
  });
}
