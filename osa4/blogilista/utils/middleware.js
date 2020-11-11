const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:", request.path);
  logger.info("Body:", request.body);
  logger.info("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  
  if (error.name === "ValidationError" || error.name === "Error") {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" })
  }

  logger.error(error.message);

  next(error);
};

module.exports = { requestLogger, errorHandler };
