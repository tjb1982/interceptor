var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
User = require("./models/user");


var app = express();
var url = "mongodb://localhost/auth_app";



mongoose.connect(url);


app.listen(3000, function(){
    console.log("The server has started");
});