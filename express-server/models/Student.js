const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }]
}, {
  timestamps: true,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Student,
};
