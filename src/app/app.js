const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("../controllers/errorController");
const AppError = require("../cores/appError");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    methods: "*",
    credential: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("../routes"));

app.all("*", () => {
  throw new AppError({ message: "Route does not define", statusCode: 404 });
});

app.use(errorHandler);

module.exports = app;
