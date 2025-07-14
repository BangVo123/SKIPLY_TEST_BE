const jwt = require("jsonwebtoken");
const AppError = require("../cores/appError");
const { verifyToken } = require("../utils/jwt");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) throw new AppError({ message: "Access denied", statusCode: 401 });

  const user = verifyToken(token);
  req.user = user;

  next();
};

module.exports = authMiddleware;
