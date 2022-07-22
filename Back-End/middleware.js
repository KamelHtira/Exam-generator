
const jwt=require('jsonwebtoken')
JWT_SECRET_KEY ="sagafgasgasga@#%@^&#234234234#$^#sdgsdfhsdaerjfgh3213202310"
async function middlewareYes(req,res,next)
{  try 
    {   
        
        user = await jwt.verify(req.cookies.token,JWT_SECRET_KEY)
        
   }
catch(err){
    console.log(err)
    return res.redirect('/auth/login') 
}

    return next()
}   
// 
async function middlewareNo(req,res,next)
{   
    try 
        {   
            user = await jwt.verify(req.cookies.token,JWT_SECRET_KEY)
        }
    catch
        {
            return next()
        }
    return res.redirect('/router/addExerciceUI') // for now
} 


module.exports = {middlewareYes ,middlewareNo }