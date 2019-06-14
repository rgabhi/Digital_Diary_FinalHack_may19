var express = require('express');
var router = express.Router();
var passport = require("passport");
var mongoose = require('mongoose');
var LocalStrategy = require("passport-local");
var User = require('../models/userModel');





passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





router.get("/",function(req,res){
    // res.redirect("/diary");
    res.redirect("login");   
})
  


//show register form
router.get("/register",function(req,res){
    res.render("register");

});
//handling user sign up
router.post("/register",function(req,res){
    var newUser = new User({ username : req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/diary");
        });
    });
});


// login form
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect : "/diary",
    failureRedirect : "/login"
}), function(req,res){

});


// LOgout 
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}






module.exports = router;