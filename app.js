var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/vendor"));
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res)=> {
    res.render("blogs/index");
})

app.get("/read", (req, res) => {
    res.render("blogs/show");
})

app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})