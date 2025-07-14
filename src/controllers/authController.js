const SuccessResponse = require("../cores/successResponse");
const AuthService = require("../services/authService");

class AuthController {
  static async login(req, res, next) {
    return new SuccessResponse({
      message: "Login success",
      metadata: await AuthService.login(req.body),
    }).send(res);
  }
  static async verify(req, res, next) {
    return new SuccessResponse({
      message: "Login success",
      metadata: await AuthService.verify(req.body),
    }).send(res);
  }
  static async githubAuth(req, res, next) {
    return new SuccessResponse({
      message: "Login success",
      metadata: await AuthService.githubAuth(req.body),
    }).send(res);
  }
}

module.exports = AuthController;
