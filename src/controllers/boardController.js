const SuccessResponse = require("../cores/successResponse");
const BoardService = require("../services/boardService");

class boardController {
  static async getAll(req, res, next) {
    return new SuccessResponse({
      message: "Get all cards success",
      statusCode: 200,
      metadata: await BoardService.getAll(),
    }).send(res);
  }
  static async create(req, res, next) {
    return new SuccessResponse({
      message: "Get all cards success",
      statusCode: 201,
      metadata: await BoardService.create(req.body),
    }).send(res);
  }
}

module.exports = boardController;
