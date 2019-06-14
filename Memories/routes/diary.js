const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var Diary = require('../models/diaryModel');

// INDEX ROUTE
router.get('/',isLoggedIn,function(req,res){
    
    Diary.find({},function(err,pages){
        if(err){
            console.log("ERROR!");
        }
        else{
            console.log(pages);
            // console.log({author:{  id :  req.user._id }});
            // console.log(req.user.username)
             res.render("index.ejs",{pages : pages});
            // res.json(pages).status(200);
        }
    })

    
}); 

//NEW ROUTE
router.get('/new',isLoggedIn,function(req,res){
    res.render("new.ejs");

});

//CREATE ROUTE
router.post('/',isLoggedIn,function(req,res){
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.bodyy; 
    var author = {
        id : req.user._id,
        username : req.user.username
    } 
    var newPage = {title : title, image : image, body : body , author : author};
    Diary.create(newPage,function(err,newlyCreated){
        if(err){
            res.render("new.ejs");
        }else{
            res.redirect("/diary");
        }
    });     
    
});

//SHOW ROUTE

router.get('/:id',function(req,res){
      Diary.findById(req.params.id,function(err,foundPage){
            if(err){
                res.redirect('/diary');
            }else{
                res.render("show.ejs",{page : foundPage})
            }
      });
});
//EDIT ROUTE
router.get("/:id/edit",function(req,res){
    Diary.findById(req.params.id, function(err,foundPage){
        if(err){
            res.redirect("/diary");
        } else{
            res.render("edit.ejs",{page : foundPage});
        }
    });
   
});

//UPDATE ROUTE

router.put("/:id",function(req,res){
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.bodyy; 
    var author = {
        id : req.user._id,
        username : req.user.username
    } 
    var editPage = {title : title, image : image, body : body , author : author};
    
    Diary.findByIdAndUpdate(req.params.id,editPage,function(err,updatedPage){
        if(err){
            res.redirect("/diary");
        }else{
            res.redirect("/diary/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:id",function(req,res){
    Diary.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/diary");
        }else{
            res.redirect("/diary");
        }
    });
 });
 

 function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;