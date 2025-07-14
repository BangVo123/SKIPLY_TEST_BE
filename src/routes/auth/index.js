const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const AuthController = require("../../controllers/authController");

const routes = express.Router();

routes.post("/login", asyncHandler(AuthController.login));
routes.post("/verify", asyncHandler(AuthController.verify));
routes.post("/github", asyncHandler(AuthController.githubAuth));

module.exports = routes;
