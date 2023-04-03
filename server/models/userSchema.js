const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
})

const Users=new mongoose.model("USER", userSchema);  ///model ban chuka hai, which is in User
module.exports=Users;
