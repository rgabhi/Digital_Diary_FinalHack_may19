const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
 const expressSanitizer = require("express-sanitizer");
const ejs = require("ejs");


const app = express();

const port = process.env.PORT || 3002;

const diary = require('./routes/diary');
const user = require('./routes/user');

// App configuration
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://rgabhi:abhi1998@cluster0-f3ajx.mongodb.net/diary?retryWrites=true&w=majority",{ useNewUrlParser: true },function(err){
    if(err){  
        console.log(err);
    }else{
        console.log("Atlas conected");
    }
});
app.set("view engine", "ejs" );
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use('/diary',diary);
app.use('/user',user);



// Mongoose Model Configuration
// Moved to Models


// RESTFUL ROUTES

//    Diary.create({
//        title : "Test Page",
//        image : "https://images.unsplash.com/flagged/photo-1556669546-b1f29875df1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//        body : "Hello this is a first diary page"
//    });

//EDIT ROUTE
app.get("/diary/:id/edit",function(req,res){
    Diary.findById(req.params.id, function(err,foundPage){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit.ejs",{page : foundPage});
        }
    });
   
});
//UPDATE ROUTE

app.put("/diary/:id",function(req,res){
    
    Diary.findByIdAndUpdate(req.params.id,req.body.page,function(err,updatedPage){
        if(err){
            res.redirect("/diary");
        }else{
            res.redirect("/diary/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/diary/:id",function(req,res){
   Diary.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/diary");
       }else{
           res.redirect("/diary");
       }
   });
});

   





// app.get("/",function(req,res){
//     res.redirect('/diary'); 
// })



app.listen(port,function(){
    console.log(`app live on ${port}`);
})