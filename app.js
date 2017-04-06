var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var routes = require("./routes/index");
User = require("./models/user");


var app = express();
var url = "mongodb://localhost/auth_app";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret: "This is a secret :o",
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(url);


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(routes);


app.listen(3000, function(){
    console.log("The server has started");
});