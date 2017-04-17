var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var routes = require("./routes/index");
User = require("./models/user");


var app = express();
var url = `mongodb://${process.env["DBHOST"]}/auth_app`;
var flash = require("connect-flash");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "This is a secret :o",
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(url);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/admin", routes.routes);

routes.registerUser("admin", process.env["ADMIN_PASSWORD"], function(e, user) {

    if (e) {
        console.error("Admin user not created");
    }
    else {
        console.log(`${user.username} created`);
        app.listen(3000, function(){
            console.log("The server has started");
        });
    }

});
