const jwt = require("jsonwebtoken");
const AppError = require("../cores/appError");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const generateAToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err)
      throw new AppError({
        message: "Token expired or invalid",
        statusCode: 401,
      });

    return decode;
  });
};

module.exports = { generateAToken, verifyToken };
