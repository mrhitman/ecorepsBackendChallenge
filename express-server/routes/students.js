const express = require("express");
const {Student} = require("../models/Student");

const router = express.Router();

router.get("/students", (req, res) => {
  Student.find({}, (error, students) => {
    if (error) res.status(500).send(error);

    res.status(200).json(students);
  });
});

router.delete("/students/:id", (req, res) => {
  Student.remove({_id: req.params.id}, (error) => {
    if (error) res.status(500).send(error);

    res.status(200).json({deleted: true});
  });
});

router.get("/students/:id", (req, res) => {
  Student.findById(req.params.id, (error, students) => {
    if (error) res.status(500).send(error);
    res.status(200).json(students);
  });
});

router.post("/students", (req, res) => {
  let student = new Student({
    name: req.body.name,
  });

  student.save((error) => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "Student created successfully",
    });
  });
});

module.exports = router;
