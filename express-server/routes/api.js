const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api works");
});

router.get("/health", (req, res) => {
  res.send({
    database: mongoose.connection.readyState === 1 ? 'UP' : 'DOWN',
  })
});

module.exports = router;
