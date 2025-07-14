const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const boardController = require("../../controllers/boardController");

const routes = express.Router();

routes.get("/", asyncHandler(boardController.getAll));
routes.post("/", asyncHandler(boardController.create));

module.exports = routes;
