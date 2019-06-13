const mongoose = require('mongoose');
const diarySchema = mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : Date
});
 
module.exports = mongoose.model("Diary", diarySchema);