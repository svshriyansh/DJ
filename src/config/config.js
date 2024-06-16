const logger = require("../logger/wiston");
require("dotenv").config();

var CONFIG = null;
function getConfig() {
  if (CONFIG == null) {
    const dbConnectionString = process.env.DATABASE_URL;
    if (!dbConnectionString) {
      logger.error("Insufficient Configs.");
      process.exit(1);
    }
    CONFIG = {
      ENV: process.env.ENV || "dev",
      JWT_SECRET: process.env.JWT_SECRET || "MY_SECRET",
      DATABASE_URL: dbConnectionString,
    };
  }
  return CONFIG;
}

module.exports = getConfig;
