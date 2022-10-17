
const Users = require('../models/Users');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv = require('dotenv');
const {verifyJWT,createJwtToken}= require('../functions/tools')
dotenv.config();
JWT_SECRET_KEY=process.env.JWT_SECRET_KEY



//verify login
async function verifyLogin (req, res){
    try{
      
    const a = await Users.findOne({ username: req.body.username}).lean()
      if(!a){    
  
        return res.json({status: "error",message: " user not found"})
     
       }
    if(await bcrypt.compare(req.body.password,a.password)){    
      console.log('password match hash')
     
     
      // creating tokens
      const accessToken =await createJwtToken({
        id:a._id,
        username:a.username
      },'5s')

      const refreshToken =await createJwtToken({
        id:a._id,
        username:a.username
      },'1d')
      
       res.cookie('accessToken',accessToken,{maxAge:1000*60*15,
        httpOnly: true,
        domain:'exam-generator.onrender.com',
        path: '/',
        sameSite: 'strict',
        secure: false,})
      res.cookie('refreshToken',refreshToken,{maxAge:1000*60*60*24,
        httpOnly: true,
        domain:'exam-generator.onrender.com',
        path: '/',
        sameSite: 'strict',
        secure: false,})

      
      return res.json({status: "ok",message: "welcome broo !  ",data:{accessToken,refreshToken}})
    }
  
    return res.json({status: "error",message: "password does not match"})
    }
    catch(err)
    {
      console.log(err);
    }
  }
  


  module.exports = { verifyLogin }