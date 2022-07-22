// Libraries
const express = require('express');
const mongoose = require('mongoose');
const Exercice = require('./models/exercices');
const pdfService = require('./services/pdf-service');
const app = express();
const cookies = require('cookie-parser')
const router=require('./routes/Routes')
const authRouter=require('./routes/AuthRoutes')
app.use(cookies())

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/router", router);
app.use("/auth", authRouter);


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