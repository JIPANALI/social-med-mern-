const mongoose = require('mongoose');

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true,
    },
    desciption:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER',
        required:true
    },

})

const Post=new mongoose.model("POST", postSchema);
module.exports=Post;