const mongoose = require("mongoose");

module.exports = async function (dbHost) {
  return mongoose
    .connect(dbHost)
    .then((connection) => {
      global.console.log("Database connected");
      return connection;
    })
    .catch((err) => {
      global.console.log(err.message);
      process.exit();
    });
};
