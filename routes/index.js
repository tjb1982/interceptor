var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root
router.get("/", function(req, res){
    res.render("home");
});

router.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//show signup form
router.get("/register", function(req, res){
    res.render("register");
});

//handle register
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handle login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){

});

//logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;