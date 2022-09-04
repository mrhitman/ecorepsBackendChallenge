const express = require("express");
const {Student} = require("../models/Student");

const router = express.Router();

function attachRankInfo(student, total, ranks) {
  const totalStudentsCount = ranks.length;
  let leadPosition = ranks.indexOf(student._id.toString()) + 1;
  leadPosition = leadPosition === 0 ? totalStudentsCount : leadPosition;

  return {
    ...student,
    percent: +((100 * student.lessons.length) / +total).toFixed(2),
    percentile:
      100 * ((totalStudentsCount - leadPosition) / (totalStudentsCount - 1)),
  };
}

router.get("/students", async (_, res) => {
  const students = await Student.find({}).lean().exec();
  const total = await global.cacheClient.get("lessonsTotal");
  const ranks = await global.cacheClient.zrevrange("ranks", 0, -1);

  res.status(200);
  res.json(students.map((s) => attachRankInfo(s, total, ranks)));
});

router.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).lean().exec();
  const total = await global.cacheClient.get("lessonsTotal");
  const ranks = await global.cacheClient.zrevrange("ranks", 0, -1);

  res.status(200);
  res.json(attachRankInfo(student, total, ranks));
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
  const student = await Student.findById(req.params.id);
  const {lessonId} = req.body;

  student.lessons.includes(lessonId)
    ? student.lessons.pull(lessonId)
    : student.lessons.push(lessonId);

  student.save();
  await global.cacheClient.zadd("ranks", student.lessons.length, req.params.id);

  res.status(200);
  res.json(student);
});

module.exports = router;
