
const MathBranche = require('../models/mathBranches');





//Get all mathBranches 
 async function getAllMathBranches (req, res){
    try{
    const data = await  MathBranche.find({})
    res.json({data:data})
    }
    catch(err)
    {
      res.send("error in retrieving data : "+err)
    }
  }
  

//Add new mathBranche 
async function addMathBranche (req, res) {
    try{
      let new_mathBranche = new MathBranche (
        {
          name: req.body.name,
          lessons: req.body.lessons
        }
      )
      await new_mathBranche.save()
      return res.json({msg :`added successfully`})
      }
      catch(err)
      {
      return res.json(err)
      }
    }




 //delete mathBranches 
async function deleteMathBranche (req,res){
    try {
        
        const data = await MathBranche.deleteOne({ _id: req.body.id })
        if (data.acknowledged && data.deletedCount>0) {
            console.log(`this ${req.body.id} is deleted`)
            return res.json({msg :`this ${req.body.id} is deleted`})
          }
          else if(data.acknowledged){ 
            console.log(`id not found`)
            return res.json({msg :`id not found`})
          }


    }catch(e){
        console.log("id incorrect")
        return res.json({msg :"id incorrect"})
    } 
  
  }

async function getLessonsByMathBranchesName(req,res) {

  try{
    const lessonsData = await MathBranche.find({name :req.body.mathBranches},'lessons')
    res.json({lessonsData:lessonsData})
    }
    catch(err)
    {
      res.send("error in retrieving data : "+err)
    }
}

  module.exports = { getAllMathBranches, addMathBranche, deleteMathBranche ,getLessonsByMathBranchesName}