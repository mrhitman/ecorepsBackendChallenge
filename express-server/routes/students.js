const express = require("express");
const {Student} = require("../models/Student");

const router = express.Router();

router.get("/students", async (_, res) => {
  const students = await Student.find({})
    .populate({path: "lessons", select: "name"})
    .lean()
    .exec();

  res.status(200);
  res.json(students);
});

router.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate()
    .exec();

  res.status(200);
  res.json(student);
});

router.post("/students", async (req, res) => {
  const {name} = req.body;
  const student = new Student({
    name,
  });

  await student.save();
  res.status(201);
  res.json({
    message: "Student created successfully",
  });
});

router.delete("/students/:id", async (req, res) => {
  await Student.deleteOne({_id: req.params.id});

  res.status(200);
  res.json({deleted: true});
});

router.post("/students/:id/toggle-lesson", async (req, res) => {
  const student = await await Student.findById(req.params.id);
  const {lessonId} = req.body;

  student.lessons.includes(lessonId)
    ? student.lessons.pull(lessonId)
    : student.lessons.push(lessonId);

  student.save();

  res.status(200);
  res.json({student});
});

module.exports = router;
