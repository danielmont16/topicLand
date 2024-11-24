const express = require("express");
const router = express.Router();
const Topic = require("../models/topic");
const Article = require("../models/article");
const AuthenticationMiddleware = require("../extensions/authentication");
// const article = require("../models/article");

//GET /Acticles

router.get("/", async (req, res, next) => {
  let articles = await Article.find().sort([["date", "descending"]]);
  res.render("articles/index", {
    title: "Article List",
    dataset: articles,
    user: req.user,
  });
});

router.get("/add", AuthenticationMiddleware, async (req, res, next) => {
  let topicList = await Topic.find().sort([["name", "ascending"]]);
  console.log(topicList);
  res.render("articles/add", {
    title: "Create a new Article",
    topics: topicList,
    user: req.user,
  });
});

// POST /Article/Add
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  let newArticle = new Article({
    title: req.body.title,
    topic: req.body.topic,
    author: req.body.author,
    creationDate: req.body.creationDate,
    content: req.body.content,
  });
  await newArticle.save();
  res.redirect("/articles");
});

// GET /projects/delete/_id
// access parameters via req.params object
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let articleId = req.params._id;
  await Article.findByIdAndRemove({ _id: articleId });
  res.redirect("/articles");
});

// GET /projects/edit/_id
router.get("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let articleId = req.params._id;
  let articleData = await Article.findById(articleId);
  let articleList = await Article.find().sort([["name", "ascending"]]);
  res.render("articles/edit", {
    title: "Edit Article",
    article: articleData,
    topic: articleList,
    user: req.user,
  });
});

// POST /projects/edit/_id
router.post("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let articleId = req.params._id;
  await Article.findByIdAndUpdate(
    { _id: articleId }, // filter to find the project to update
    {
      // updated data
      title: req.body.title,
      topic: req.body.topic,
      author: req.body.author,
      date: req.body.date,
      content: req.body.content,
    }
  );
  res.redirect("/articles");
});

module.exports = router;
