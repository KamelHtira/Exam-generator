// Libraries
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookies = require('cookie-parser')
const router=require('./routes/Routes')
const authRouter=require('./routes/AuthRoutes')
const Exercice = require('./models/exercices')
app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/router", router);
app.use("/auth", authRouter);
app.get('/',(req,res)=>{
  res.send('exam-generator service is working..')
})

// connecting server to mongoDB Atlas :
mongoose.connect('mongodb+srv://kamel:kamel@cluster0.wejj0ir.mongodb.net/?retryWrites=true&w=majority' , (err,done)=>{
  if (err)
  {
    console.log(err);
  }
  if(done){
    console.log('database is connected..');
  }
}) 


//running server
app.listen(5000, () => console.log('Exame-maker is listening on port 5000.'));  