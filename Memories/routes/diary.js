const express = require('express');
const router = express.Router();
const multer = require("multer");
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename : function(req, file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }

});

const fileFilter = function(req,file,cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'|| file.mimetype ==='image/gif' || file.mimetype ==='video/mp4' ){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({storage : storage, 
    limits:{
        fileSize : 1024*1024*8
        },
    fileFilter : fileFilter

});

var Diary = require('../models/diaryModel');

// INDEX ROUTE
router.get('/',isLoggedIn,function(req,res){
    
    Diary.find({},function(err,pages){
        if(err){
            console.log("ERROR!");
        }
        else{
            // console.log(pages);
            // console.log({author:{  id :  req.user._id }});
            // console.log(author.id);
            // console.log(req.user.username)
             res.render("index.ejs",{pages : pages, userName: req.user.username});
            // res.json(pages).status(200);
        }
    });

    
}); 

//NEW ROUTE
router.get('/new',isLoggedIn,function(req,res){
    res.render("new.ejs");
 
});

//CREATE ROUTE
router.post('/',upload.single('image'),function(req,res,next){
     console.log(req.file);
    var title = req.body.title;
    var image = req.file.path;
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

router.get('/:id',isLoggedIn,function(req,res){
      Diary.findById(req.params.id,function(err,foundPage){
            if(err){
                res.redirect('/diary');
            }else{
                res.render("show.ejs",{page : foundPage})
            }
      });
});
//EDIT ROUTE
router.get("/:id/edit",isLoggedIn,function(req,res){
    Diary.findById(req.params.id, function(err,foundPage){
        if(err){
            res.redirect("/diary");
        } else{
            res.render("edit.ejs",{page : foundPage});
        }
    });
   
});

//UPDATE ROUTE

router.put("/:id",isLoggedIn,function(req,res){
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
router.delete("/:id",isLoggedIn,function(req,res){
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