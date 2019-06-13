const mongoose = require('mongoose');
const diarySchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : {type:String},
    image : {type:String},
    body : {type:String},
    created : {type:Date,default:Date.now}
});
 
module.exports = mongoose.model("Diary", diarySchema);