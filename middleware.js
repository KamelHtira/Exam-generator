
const dotenv = require('dotenv');
const {verifyJWT,createJwtToken}= require('./functions/functions.js')
dotenv.config();
JWT_SECRET_KEY=process.env.JWT_SECRET_KEY

async function middlewareYes(req,res,next)
{  
    const accessToken = await verifyJWT(req.cookies.accessToken)
    const refreshToken = await verifyJWT(req.cookies.refreshToken)

    if (accessToken.valid) {
        return next()
    }
    if (refreshToken.valid &&  accessToken.err =="jwt expired") {
        
        const newAccessToken = await createJwtToken(refreshToken.data.data,'5s')
        res.cookie('accessToken',newAccessToken,{maxAge:1000*60*60*24,
            httpOnly: true,
            domain:'localhost',
            path: '/',
            sameSite: 'strict',
            secure: false,})
        return next()   
        
        
    }
   return res.redirect('/auth/login')
}   
// 
async function middlewareNo(req,res,next)
{   
     const accessToken = await verifyJWT(req.cookies.accessToken)
     const refreshToken = await verifyJWT(req.cookies.refreshToken)
     if (accessToken.valid || (accessToken.err == "jwt expired" && refreshToken.valid)) {
        const newAccessToken = await createJwtToken(refreshToken.data.data,'5s')
        res.cookie('accessToken',newAccessToken,{maxAge:1000*60*60*24,
            httpOnly: true,
            domain:'localhost',
            path: '/',
            sameSite: 'strict',
            secure: false,})
        return res.redirect('/router/home') 
     }

    return next() // for now
} 



module.exports = {middlewareYes ,middlewareNo }