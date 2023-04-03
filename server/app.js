const express=require('express');
const cookieParser=require('cookie-parser');
const bcryptjs=require('bcryptjs')

const jwt=require('jsonwebtoken')  // it is because when gain again refreshing not need to login again and again
const cors=require('cors');
const app=express();

//Import Schema

const Users=require('./models/userSchema');
const Post = require('./models/postSchema');

//connect to db
require('./db/connection')

//Import Middlewares
const authenticate=require('./middleware/auth');

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors())
const port = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.send('Hello world');
})


app.post('/api/register', async (req, res, next) => {
    try
    {
        const {username, email, password}=req.body; //take from the front-end side

        if(!username || !email || !password){
            res.status.send('Cannot be emty field')
        }

        const isExist= await Users.findOne({email}); //from users using email find one 
        console.log(isExist, 'isExists');
        if (isExist){
            res.status(400).send('User already exist')
        }else{
            const user=new Users({
                username,
                email,
                password
            })
            bcryptjs.hash(password, 10, (err, hashedPassword)=>{   ///encrypted password then save
                if(err)  next(err)
                user.set('password', hashedPassword)
                user.save((err)=>{
                    if(error) next(error)
                    return    res.status(200).send('Successfully Register')
                })
            })
           
        
        }
    }catch(error)
    {
        res.status(500).send('Server Error')
        console.log(error, 'error')
    }
    
})


//loggin
app.post('/api/login', async(req, res) =>{  //take the input from this front-end url
    const {email, password}=body.req; //destrusture the element from front-end url
    const user= await Users.findOne({email});// mathch up with exisiting email which is in Users and with email
    if(!user){ // if not match the email with existing mail
        res.status(401).send('User or password is invalid ')
    }else{
        const validate=await bcryptjs.compare(password, user.password)  //pasword means which user is given now and compare to already existed 
        if(!validate){
            res.status(401).send('User or password is invalid');
        }else
            {
                const payload={
                     id:user._id,  ///it becauase every json file return id 
                    username:user.username
                    }

                const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY || 'THIS_IS_SECRET_KEY_OF_JWT';
                jwt.sign(payload, JWT_SECRET_KEY,
                    {expiresIn:86400},   ///this much have validity of token 86400 s means 24hr
                    (err, token)=>{
                            if(err) res.json({message: err})
                            return res.status(200).json({user, token})   /// it will retun the token after generated and return user
                                    }
                
                        )

            }
    }
})


//for the post (some post of user)

app.post('/api/new-post',authenticate, async (req,res)=>{
    ///every one cant access so we need to build midleware

    try{
            const {caption, desc, url}=req.body;
            const {user}=req  ///that user from the authentication 
            if(!caption || !desc || !url ){
                res.status(400).send('Please fill all the fields')
            }
            const CreatePost=await Post({
                caption,
                description: desc,
                image:url,
                user:user       //put that user id in user
            })
            await CreatePost.save();
            res.status(200).send('Create Post Successfully')
    }catch(error){

        res.status(500).send('Error'+ error)

    }
})

app.get('/api/profile', authenticate, async(req, res)=>{
    try{
        const {user}=req;
        const posts= await Post.find({user:user._id}).populate("user", "_id, username")  // kake populate korte hobe (kar detail lagbe)=user
        //ki ki populate korte hobe like id, username of the user
        res.status(200).json({posts})
    }catch(error){
        res.status(500).send(error)

    }
})

app.get('/api/posts', authenticate, async(req, res)=>{
    try{
        const {user}=req;
        const posts= await Post.find().populate('user', '_id username email'); ///user er id, username , email get kore niyechi ans
        // posts a send kore diyechi
        res.status(200).json({posts})
    }catch(error){
            res.status(500).send(error)
    }
})

app.listen(port, ()=>{
    console.log('Server is running');
})
