const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Testing out gitpush with this comment 
const app = express();

const port = process.env.PORT || 3001;

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
// app.set("view engine", "ejs" ) 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
//Diary Route

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

// app.get("/",function(req,res){
//     res.redirect('/diary'); 
// })



app.listen(port,function(){
    console.log(`app live on ${port}`);
})