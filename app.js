var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose= require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    hbs     = require("hbs"),
    flash   = require("connect-flash"),
    User    = require("./models/user");

var indexRoutes = require("./routes/index"),
    blogRoutes  = require("./routes/blogs");

mongoose.connect("mongodb://localhost:27017/bloggr", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/vendor"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

hbs.registerPartials(__dirname + "/views/partials");

app.use(require("express-session")({
    secret: "I am great in NodeJS",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use("/blogs", blogRoutes);

app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})