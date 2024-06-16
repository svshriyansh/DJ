const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const logger = require("./logger/wiston");
const routes = require("./routes");
const interceptor = require("./middleware/requestInterceptor");
const config = require("./config/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(bodyParser.json());
  app.use(interceptor);
  app.use(cors());
  app.get("/", (req, res) => {
    res.status(200).json({ message: `Backend APIs running` });
  });

  app.use("/api/v1", routes);
  const PORT = config.PORT || 5000;

  app.listen(PORT, () => logger.info(`Server started at ${PORT}`));
}

main()
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
