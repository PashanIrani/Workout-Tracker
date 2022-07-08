const bcrypt = require("bcrypt");
const { pool } = require("../db");
const uid = new (require("short-unique-id"))();
const { isNully } = require("../helpers");

// Validates info for account creation
function validateAccountInfo(info) {
  const { name, email, password } = info;

  const nameStatus = !isNully(name);
  const emailStatus = !isNully(email); // TODO: Check email format
  const passwordSatus = !isNully(password);

  return nameStatus && emailStatus && passwordSatus;
}

module.exports = (app) => {
  app.post("/login", (req, res) => {
    // Ensure no values are null-like
    if (isNully(req.body.email) || isNully(req.body.password)) {
      res.status(401).send("Incorrect Data Provided!");
      return;
    }

    // Find User by email to proceed accordingly
    pool.query("SELECT * FROM Users WHERE email = $1", [req.body.email], (err, result) => {
      const { rows } = result;

      // If no rows; then there are no users with the provided email; end here.
      if (rows.length == 0) {
        res.status(401).send("No Such User.");
        return;
      }

      const user = rows[0];

      // Check passord with hashed value
      bcrypt.compare(req.body.password, user.password).then((result) => {
        // If password is correct
        if (result) {
          req.session.authenticated = true; // mark session as authenticated

          // store user info incase for future queries during this session
          req.session.user = {
            id: user.user_id,
            email: user.email,
            name: user.name,
          };

          res.status(200).send("Correct Credentials!");
          return;
        }

        res.status(401).send("Incorrect Credentials!");
      });
    });
  });

  app.get("/logout", (req, res) => {
    // destroy session
    req.session.destroy((err) => {
      if (err) res.status(500).send("failed to logout");
      res.status(200).redirect("/");
    });
  });

  app.post("/create-account", (req, res) => {
    if (!validateAccountInfo(req.body)) {
      res.status(401).send("Incorrect Data Provided!");
      return;
    }

    pool.query("SELECT * FROM Users WHERE email = $1", [req.body.email], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("SQL Error!");
        return;
      }

      const { rows } = result;

      // if there is no user with this email, add them to DB
      if (rows.length == 0) {
        // hash password, and store in DB
        bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
          pool.query(
            "INSERT INTO Users (user_id, name, email, password) VALUES ($1, $2, $3, $4)",
            [uid(), req.body.name, req.body.email, hashedPassword],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("SQL Error!");
                return;
              }

              res.status(200).send("Account Created.");
            }
          );
        });
      } else {
        res.status(401).send(`Account with ${req.body.email} already exists!`);
      }
    });
  });
};
