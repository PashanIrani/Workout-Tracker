const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const { isAuthenticated } = require("./middlewares");

dotenv.config();

const PORT = process.env.PORT;

const { exerciseRoutes, auth } = require("./routes/");

// Tells express to use static files from /dist
app.use("/dist", express.static(path.join(__dirname, "./../../dist/")));
app.use(express.static(path.join(__dirname, "./../../public/")));

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "workouttracker",
    saveUninitialized: false,
    resave: true
  })
);

const serveIndex = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
};

// Serve main page
app.get("/", serveIndex);
app.get("/App/", isAuthenticated, serveIndex);
app.get("/App/*", isAuthenticated, serveIndex);
app.get("/login", serveIndex);
app.get("/signup", serveIndex);

// Connect Routes
exerciseRoutes(app);
auth(app);

app.listen(PORT);
