const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Diary = require('../models/diaryModel');

// INDEX ROUTE
router.get('/',function(req,res){
    Diary.find({},function(err,pages){
        if(err){
            console.log("ERROR!");
        }
        else{
             res.render("index.ejs",{pages : pages});
            // res.json(pages).status(200);
        }
    })

    
}); 

//NEW ROUTE
router.get('/new',function(req,res){
    res.render("new.ejs");

});

//CREATE ROUTE
router.post('/',function(req,res){
    Diary.create(req.body.page,function(err,newPage){
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
    
    Diary.findByIdAndUpdate(req.params.id,req.body.page,function(err,updatedPage){
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
 

module.exports = router;