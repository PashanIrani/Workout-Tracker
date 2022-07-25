const exerciseRoutes = require("./exerciseRoutes");
const workoutRoutes = require("./workoutRoutes");
const sessionRoutes = require("./sessionRoutes");
const auth = require("./auth");
const bodyLogRoutes = require("./bodyLogRoutes");

module.exports = {
  exerciseRoutes,
  auth,
  workoutRoutes,
  sessionRoutes,
  bodyLogRoutes,
};
