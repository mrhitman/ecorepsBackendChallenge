const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = {
  Lesson,
};
