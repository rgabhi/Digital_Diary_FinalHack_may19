const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Diary = require('../models/diaryModel');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
    cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }


});


const fileFilter = (req,file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'|| file.mimetype === 'image/gif' || file.mimetype === 'image/png' || file.mimetype === 'image/ogg' || file.mimetype === 'image/mp4' || file.mimetype === 'image/mpv')
    {cb(null,true);
    }else{
        cb(null,false)
    }

}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

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
router.post('/',upload.single('page[image]'),function(req,res){
    console.log(req.file);
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