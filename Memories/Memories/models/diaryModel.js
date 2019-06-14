const mongoose = require('mongoose');
// const diarySchema = mongoose.Schema({
//     user : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'User',
//         required : true
//     },
//     title : {type:String},
//     image : {type:String},
//     body : {type:String},
//     created : {type:Date,default:Date.now}
// });

var diarySchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : Date
});
 
// var Diary = mongoose.model("Diary", diarySchema);

 
module.exports = mongoose.model("Diary", diarySchema);