const express = require("express");
const router = express.Router();
const Topic = require("../models/topic");
const AuthenticationMiddleware = require("../extensions/authentication");

//GET /Topics

router.get("/", AuthenticationMiddleware ,async (req, res, next) => {
    let topics = await Topic.find().sort([["name", "ascending"]]);
        res.render("topics/index",{title:"Manage your content", dataset: topics, user:req.user});
  });

// GET /Topics/Add
router.get("/add", (req, res, next) => {
  res.render("topics/add", { title: "Add a new Topic" });
});

// POST /Topics/Add
router.post("/add",async(req, res, next)=>{
  let newTopic = new Topic({
    name: req.body.name,
    description: req.body.description,
    creationDate: req.body.creationDate
  });
  await newTopic.save();
  res.redirect("/topics");
});

module.exports = router;

