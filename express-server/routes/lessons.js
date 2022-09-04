const express = require("express");
const {Lesson} = require("../models/Lesson");

const router = express.Router();

router.get("/lessons", async (_, res) => {
  const lessons = await Lesson.find({});

  res.status(200);
  res.json(lessons);
});

router.delete("/lessons/:id", async (req, res) => {
  await Lesson.deleteOne({_id: req.params.id});
  await global.cacheClient.set('lessonsTotal', await Lesson.count());

  res.status(200);
  res.json({deleted: true});
});

router.get("/lessons/:id", async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  res.status(200);
  res.json(lesson);
});

router.post("/lessons", async (req, res) => {
  const {title, content} = req.body;
  const lesson = new Lesson({
    title,
    content,
  });
  await lesson.save();
  await global.cacheClient.set('lessonsTotal', await Lesson.count());

  res.status(201);
  res.json({
    message: "Lesson created successfully",
  });
});

module.exports = router;
