const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "config.env" });
const ApiError = require("./src/utils/apiError");
const globalError = require("./src/middlewares/errorMiddleware");
const dbConnection = require("./src/config/database");
const mountRoutes = require("./src/routes");

// Connect with db
dbConnection();

// express app
const app = express();
// Enable other domains to access your application
app.use(cors());
app.options("*", cors());
// Middlewares
app.use(express.static(path.join(__dirname, "src/uploads")));

// Mount Routes
mountRoutes(app);
app.use(globalError);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
