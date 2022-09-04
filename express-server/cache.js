const redis = require("redis");
const util = require("util");

module.exports = async function (cacheConnection) {
  const client = redis.createClient({
    url: cacheConnection,
  });
  global.console.log("Cache connected");
  client.get = util.promisify(client.get);
  client.set = util.promisify(client.set);
  client.zrevrange = util.promisify(client.zrevrange);
  client.zrange = util.promisify(client.zrange);

  client.on("error", (err) => global.console.warn("redis client error", err));
  return client;
};
