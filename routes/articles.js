const express = require("express");
const router = express.Router();
const Topic = require("../models/article");

//GET /Topics

router.get("/", (req, res, next) => {
    
    res.render("articles/index");
  });

module.exports = router;