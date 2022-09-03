const express = require("express");
const {Lesson} = require("../models/Lesson");

const router = express.Router();

router.get("/lessons", (req, res) => {
  Lesson.find({}, (error, lessons) => {
    if (error) res.status(500).send(error);

    res.status(200).json(lessons);
  });
});

router.delete("/lessons/:id", (req, res) => {
  Lesson.remove({_id: req.params.id}, (error) => {
    if (error) res.status(500).send(error);

    res.status(200).json({deleted: true});
  });
});

router.get("/lessons/:id", (req, res) => {
  Lesson.findById(req.params.id, (error, lessons) => {
    if (error) res.status(500).send(error);

    res.status(200).json(lessons);
  });
});

router.post("/lessons", (req, res) => {
  const lesson = new Lesson({
    title: req.body.title,
    content: "some content",
  });

  lesson.save((error) => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "Lesson created successfully",
    });
  });
});

module.exports = router;
