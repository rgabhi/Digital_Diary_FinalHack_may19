const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Testing out gitpush with this comment 
const app = express();

const port = process.env.PORT || 3001;


// App configuration
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://rgabhi:abhi1998@cluster0-f3ajx.mongodb.net/diary?retryWrites=true&w=majority",{ useNewUrlParser: true },function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Atlas conected");
    }
});
// app.set("view engine", "ejs" ) 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));



// Mongoose Model Configuration
var diarySchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : Date
});
 
var Diary = mongoose.model("Diary", diarySchema);

// RESTFUL ROUTES

//    Diary.create({
//        title : "Test Page",
//        image : "https://images.unsplash.com/flagged/photo-1556669546-b1f29875df1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//        body : "Hello this is a first diary page"
//    });
app.get("/",function(req,res){
    res.redirect("/diary"); 
})

// INDEX ROUTE
app.get("/diary",function(req,res){
    Diary.find({},function(err,pages){
        if(err){
            console.log("ERROR!");
        }
        else{
            res.render("index.ejs",{pages : pages});
        }
    })

    
}); 

//NEW ROUTE
app.get("/diary/new",function(req,res){
    res.render("new.ejs");

});

//CREATE ROUTE
app.post("/diary",function(req,res){
    Diary.create(req.body.page,function(err,newPage){
        if(err){
            res.render("new.ejs");
        }else{
            res.redirect("/diary");
        }
    });
    
});

//SHOW ROUTE

app.get("/diary/:id",function(req,res){
      Diary.findById(req.params.id,function(err,foundPage){
            if(err){
                res.redirect('./diary');
            }else{
                res.render("show.ejs",{page : foundPage})
            }
      });
})

      










app.listen(port,function(){
    console.log(`app live on ${port}`);
})