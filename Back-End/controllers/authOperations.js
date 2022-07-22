
const Users = require('../models/Users');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv = require('dotenv');
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
     
     
      // creating token
      const token = jwt.sign({
        id:a._id,
        username:a.username
      },
      JWT_SECRET_KEY
      )
       res.cookie('token',token,{maxAge:1000*60*15,
        httpOnly: true,
        domain:'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false,})
      
      return res.json({status: "ok",message: "welcome broo !  ",data:token})
    }
  
    return res.json({status: "error",message: "password does not match"})
    }
    catch(err)
    {
      console.log(err);
    }
  }
  
  module.exports = { verifyLogin }