const http = require("http");
const dotenv = require("dotenv");

const appInitialize = require("./app");
const dbInitialize = require("./database");
const {getEnvValue} = require("./tools/env");

async function bootstrap({port, dbHost} = settings) {
  await dbInitialize(dbHost);
  return appInitialize(port);
}

if (require.main === module) {
  dotenv.config();
  const dbHost = getEnvValue("DB_CONNECTION");
  const port = getEnvValue("PORT", 3000);

  bootstrap({
    port,
    dbHost,
  }).then((app) => {
    const server = http.createServer(app);
    server.listen(port, () => global.console.log(`API running on localhost:${port}`));
  });
}
