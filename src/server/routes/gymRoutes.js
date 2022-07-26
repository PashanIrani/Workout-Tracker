const { pool } = require("../db");
const uid = new (require("short-unique-id"))();
const url = require("url");
const { isNully } = require("../helpers");

module.exports = (app) => {
  app.get("/trainers", (req, res) => {
    const { gym_id } = req.query;
    if (isNully(gym_id)) {
      res.status(400).send(`gym_id can't be ${gym_id}`);
      return;
    }

    pool.query(
      "SELECT trainer_id, Trainer.name, gym_id, sponsor, website_url AS sponsor_website_url FROM Trainer LEFT JOIN Sponsor ON trainer.sponsor = sponsor.name WHERE gym_id = $1",
      [gym_id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("SQL Error!");
          return;
        }

        res.status(200).json(result.rows);
      }
    );
  });

  app.get("/get-gym-list", (req, res) => {
    pool.query(
      `SELECT gym_id, name, street_address, gym.postal_code, city, province FROM Gym LEFT JOIN Address ON Gym.postal_code = Address.postal_code`,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("SQL Error!");
          return;
        }

        res.status(200).json(result.rows);
      }
    );
  });

  app.post("/set-gym", (req, res) => {
    let value = req.body.gym_id;
    if (isNully(req.body.gym_id)) {
      value = null;
    }

    pool.query(
      `UPDATE Users SET gym_id = $1 WHERE user_id = $2`,
      [value, req.session.user.id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("SQL Error!");
          return;
        }

        res.status(200).send("Gym updated for user");
      }
    );
  });
};
