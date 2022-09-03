const express = require("express");
const {Student} = require("../models/Student");

const router = express.Router();

router.get("/students", async (_, res) => {
  const students = await Student.find({}).populate().lean().exec();
  res.status(200);
  res.json(students);
});

router.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate()
    .lean()
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

module.exports = router;
