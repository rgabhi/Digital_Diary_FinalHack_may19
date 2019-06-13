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
            res.redirect("/");
        }
    });
    
});

//SHOW ROUTE

router.get('/:id',function(req,res){
      Diary.findById(req.params.id,function(err,foundPage){
            if(err){
                res.redirect('./diary');
            }else{
                res.render("show.ejs",{page : foundPage})
            }
      });
})

module.exports = router;