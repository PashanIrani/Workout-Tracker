const { pool } = require("../src/server/db");
const fs = require('fs');
const path = require('path');

// Inits the db
pool.query(fs.readFileSync(path.join(__dirname, '../src/server/queries/db-up/create-table-user.sql')).toString(), (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
});
