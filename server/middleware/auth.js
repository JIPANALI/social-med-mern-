const jwt=require('jsonwebtoken');
const Users=require('../models/userSchema')

const authenticate= async (req, res, next)=>{
    const {Authorization=''}=req.headers;
    const [bearer, token]=authorization?.split(' ')
   try{
    if(!authorization || !token){
        res.status(401).send('Invalid Token')
    }
    


    const verifyToken=jwt.verify(token, 'THIS_IS_SECRET_KEY_OF_JWT');  //using this which token using req.header verify with the "Thisis.. "

    //using this verifyToken._id we can get the user id and also this in that user that token also present that user found and 
    // put to user
    const user=await Users.findOne({_id: verifyToken.id, token})

    if (!user){
        res.status(401).send('User not found');
    }
    req.user=user; /// already coomming header and in that header there is called user in this user we will put the userid
    next()
   }catch(error){
        res.status(500).send(error)
   }
}