
const jwt=require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
JWT_SECRET_KEY=process.env.JWT_SECRET_KEY

async function verifyJWT(token)
{  try 
    {   
        
       data =await jwt.verify(token, JWT_SECRET_KEY)
       return { valid : true ,err:null, data:data}
   }
catch(err){

        return { valid : false , err: err.message}

}

}  
async function createJwtToken(data,date)
{  
    const token = jwt.sign({
        data
      },
      JWT_SECRET_KEY
      , { expiresIn: date }
      )
      return token
}    
module.exports = {verifyJWT , createJwtToken}