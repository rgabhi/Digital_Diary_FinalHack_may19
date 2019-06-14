const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/userModel');

//Retrieving all users
router.get('/',function(req,res){
    User.find({},function(err,dashboardPages){
        if(err)
        {
            console.log("Error!");
        }
        else
        {
            console.log("Show all posts by user with his dashboard");
            // res.render("dashboard.ejs",{dashboard :  )
        }
    })
    // res.send("User's page");
})

router.get('/signup',function(req,res){
    User.create(req.body.page,function(err,newPage){
        if(err){
            //  res.render("signup.ejs");
            console.log("Stay on signup Page")
        }else{
            // res.redirect("loginpage");
            console.log("Redirect to Login Page");
        }
    });
})

module.exports = router;