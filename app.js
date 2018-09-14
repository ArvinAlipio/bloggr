var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose= require("mongoose"),
    hbs     = require("hbs"),
    User    = require("./models/user");


mongoose.connect("mongodb://localhost:27017/bloggr", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/vendor"));
app.use(express.static(__dirname + "/public"));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res)=> {
    res.render("landing");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", (req, res) => {

})

app.post("/register", (req, res) => {
    var newUser = new User({
                    username: req.body.user["username"],
                    emailAddress: req.body.user["email"]
                  });
    var isPasswordConfirmed = confirmPassword(req);

    if (isPasswordConfirmed) {
        User.register(newUser, req.body.user["password"], (err, user) => {
            if (err) {
                console.log(err);
                return res.redirect("/login");
            }
            res.redirect("/blogs");
        })
    } else { 
        res.send("Passwords don't match");
    }
   
})

var confirmPassword = (req) => {
    var password = req.body.user["password"];
    var confirmPassword = req.body.user["confirm-password"];

    return password == confirmPassword;
}


app.get("/blogs", (req, res) => {
    res.render("blogs/index");
})

app.get("/blogs/:id", (req, res) => {
    res.render("blogs/show");
})

app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})