const Exercice = require('../models/exercices.js');
const Users = require('../models/Users.js');
const bcrypt=require('bcryptjs')






//Get all exercices 
 async function getAllExercices (req, res){
    try{
    const data = await  Exercice.find({})
    res.send(data)
    }
    catch(err)
    {
      res.send("error in retrieving data : "+err)
    }
  }
  

//Add new exercice 
async function addExercice (req, res) {
    try{
      let new_exercice = new Exercice (
        {
          path: req.body.path,
          height:Number(req.body.height),
          category: req.body.category
        }
      )
      await new_exercice.save()
      return res.json({msg :`added successfully`})
      }
      catch(err)
      {
      return res.json(err)
      }
    }


//Add new user 90%
async function addNewUser (req, res) {
    try{
      password = await bcrypt.hash(req.body.password,10)
      let new_user = new Users (
        {
          username: req.body.username,
          password: password
        }
      )
      console.log(new_user)
      await  new_user.save();
      res.send(`user is added successfully : ${new_user}`)
      }
      catch(err)
      {
        console.log(err) 
        res.send(err)
      }
    }



 //delete exercices 
async function deleteExercice (req,res){
    try {
        
        const data = await Exercice.deleteOne({ _id: req.body.id })
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



  //Get get Exercices By Category 90% 
async function getExercicesByCategory (req, res){
    try{
    // const  categories =  req.body.category
    const a = await Exercice.find({ category: "proba" })
    res.send(a)
    
    }
    catch(err)
    {
      console.log(err);
      res.send(err)
    }
  }
  module.exports = { getAllExercices, addExercice, addNewUser, deleteExercice, getExercicesByCategory  }