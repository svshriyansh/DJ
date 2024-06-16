const logger = require("../logger/wiston");

module.exports = function (req, res, next) {
  res.on("finish", () => {
    if (res.statusCode.toString()[0] != "2") {
      logger.error(`"[${req.method}] ${req.originalUrl}" ${res.statusCode}`);
    } else {
      logger.info(`"[${req.method}] ${req.originalUrl}" ${res.statusCode}`);
    }
  });
  next();
};
