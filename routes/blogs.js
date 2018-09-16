var express = require("express"),
    router  = express.Router(),
    Blog    = require("../models/blog");

router.get("/", (req, res) => {
    res.render("blogs/index");
})

router.get("/new", (req, res) => {
    res.render("blogs/new")
})

router.get("/:id", (req, res) => {
    res.render("blogs/show");
})



module.exports = router;
