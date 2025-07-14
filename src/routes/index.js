const express = require("express");

const routes = express.Router();

routes.use("/api/v1/auth", require("./auth"));
routes.use("/api/v1/boards", require("./board"));

module.exports = routes;
