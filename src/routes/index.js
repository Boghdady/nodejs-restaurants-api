const restaurantsRoute = require("./restaurantsRoute");
const mealsRoute = require("./mealsRoute");

const mountRoutes = app => {
  app.use("/api/v1/restaurants", restaurantsRoute);
  // app.use('/api/v1/meals', mealsRoute);
};
module.exports = mountRoutes;
