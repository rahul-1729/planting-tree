const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    
    user:{type: mongoose.Schema.Types.ObjectId, ref:'Users'},
    imageUrl:String,
    state:String,
    date:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Plant',plantSchema);