var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

function registerUser(username, password, callback) {
    User.register(
        new User({
            username: username
        }),
        password,
        callback
    );
}

//root
router.get("/", isLoggedIn, function(req, res){
    res.render("create-user");
});

router.get("/auth", function(req, res) {
    res.status = req.isAuthenticated() ? 200 : 401;
    res.end();
});

//router.get("/secret", isLoggedIn, function(req, res){
//    res.render("secret");
//});

//show signup form
router.get("/create-user", isLoggedIn, function(req, res){
    res.render("create-user");
});

//handle register
router.post("/create-user", isLoggedIn, function(req, res){
    registerUser(
        req.body.username,
        req.body.password,
        function(err, user){
            if(err){
                console.log(err);
                req.flash("error", err.message);
                //return res.render("register");
                res.redirect("/create-user");
            } else {
                passport.authenticate("local")(req, res, function(){
                    req.flash(
                        "success", "You have successfully created user " + user.username
                    );
                    res.redirect("/create-user");
                });
            }
        }
    );
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handle login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/create-user",
    failureRedirect: "/login"
}), function(req, res){

});

//logout
router.get("/logout", isLoggedIn, function(req, res){
    req.logout();
    req.flash("success", "You are now logged out!");
    res.redirect("/");
});

module.exports = {
    routes: router,
    registerUser: registerUser
}
