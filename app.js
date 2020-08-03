var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var ejs = require("ejs");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");


var app = express();

const port = process.env.PORT || 3001;

var diary = require('./routes/diary'); 
var user = require('./routes/user');
  

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
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended : true}));

app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret : "Professional Geek",
    resave : false,
    saveUninitialized : false
}));


app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



app.use('/diary',diary);
app.use(user);


app.listen(port,function(){
    console.log(`app live on ${port}`);
})