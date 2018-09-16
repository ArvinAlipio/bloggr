var express = require("express"),
    router  = express.Router(),
    passport= require("passport"),
    User    = require("../models/user");

router.get("/", (req, res)=> {
    res.render("landing");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), (req, res) => {

})

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You have successfully logged out");
    res.redirect("/");
})

router.post("/register", (req, res) => {
    var newUser = new User({
                    username: req.body.user["username"],
                    emailAddress: req.body.user["email"]
                  });
    var isPasswordConfirmed = confirmPassword(req);

    if (isPasswordConfirmed) {
        User.register(newUser, req.body.user["password"], (err, user) => {
            if (err) {
                console.log(err);
                req.flash("error", err.message);

                return res.redirect("/login");
            }

            req.flash("success", "Welcome to Bloggr");
            res.redirect("/blogs");
        })
    } else { 
        req.flash("error", "Passwords don't match");
        
        return res.redirect("/login");
    }
   
})

var confirmPassword = (req) => {
    var password = req.body.user["password"];
    var confirmPassword = req.body.user["confirm-password"];

    return password == confirmPassword;
}

module.exports = router;