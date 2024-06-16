const winston = require("winston");
const { format } = require("winston");
const { combine, timestamp, printf, colorize } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}]: ${level} ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), myFormat),
    })
  );
}

module.exports = logger;
