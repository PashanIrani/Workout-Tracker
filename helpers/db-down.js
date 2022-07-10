const { pool } = require("../src/server/db");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface.question(
  "🚨🚨🚨 Are you sure you want to destroy the DB? (y/n) ",
  function (ans) {
    if (ans == "y" || ans == "yes") {
      dbDown();
    }

    interface.pause();
  }
);

// Tears Down DB
function dbDown() {
  pool.query(
    fs
      .readFileSync(
        path.join(__dirname, "../src/server/queries/db-down/drop-all.sql")
      )
      .toString(),
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Dropped all tables 💣");
      }
      process.exit();
    }
  );
}
