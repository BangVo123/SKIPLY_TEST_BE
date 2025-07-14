class SuccessResponse {
  constructor({ message = "OK", statusCode = 200, metadata = {} }) {
    (this.message = message),
      (this.statusCode = statusCode),
      (this.metadata = metadata);
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }
}

module.exports = SuccessResponse;
