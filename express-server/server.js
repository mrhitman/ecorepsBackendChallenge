const http = require("http");
const dotenv = require("dotenv");

const appInitialize = require("./app");
const dbInitialize = require("./database");
const cacheInitialize = require("./cache");
const {getEnvValue} = require("./tools/env");

async function bootstrap({port, dbHost, cacheHost} = settings) {
  global.dbClient = await dbInitialize(dbHost);
  global.cacheClient = await cacheInitialize(cacheHost);
  global.app = appInitialize(port);
  return global.app;
}

if (require.main === module) {
  dotenv.config();
  const dbHost = getEnvValue("DB_CONNECTION");
  const cacheHost = getEnvValue("CACHE_CONNECTION");
  const port = getEnvValue("PORT", 3000);

  bootstrap({
    port,
    dbHost,
    cacheHost,
  }).then((app) => {
    const server = http.createServer(app);
    server.listen(port, () =>
      global.console.log(`API running on localhost:${port}`)
    );
  });
}
