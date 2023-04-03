const mongoose=require('moongoose');
const db=`mongodb+srv://social:social@cluster0.ftp1f6d.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(db).then(()=>{
  console.log("database connected successfully");
}).catch((e)=>{
  console.log(e, '=<error');
})