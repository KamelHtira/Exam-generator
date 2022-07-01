// Libraries
const express = require('express');
const mongoose = require('mongoose');
const Exercice = require('./models/exercices');
const pdfService = require('./pdf-service');

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connecting server to mongoDB cloud :
mongoose.connect('mongodb+srv://kamel:kamel@cluster0.wejj0ir.mongodb.net/?retryWrites=true&w=majority' , (err,done)=>{
  if (err)
  {
    console.log(err);
  }
  if(done){
    console.log('database is connected..');
  }
}) 

//Get all exercices 
app.get('/exercices', async (req, res) => {
  try{
  await  Exercice.find({}).then(data => {res.send(data)})
  
  }
  catch(err)
  {
    console.log(err);
  }
});

//Add new exercice 
app.post('/add_new_exercice', async (req, res) => {
try{
  let new_exercice = new Exercice (
    {
      path: req.body.path,
      height:req.body.height,
      category: [req.body.category]
    }
  )
  await  new_exercice.save();
  res.send(`exercice is added successfully`)
  }
  catch(err)
  {
    console.log(err);
  }
});

//delete exercices 

app.get("/deleteExercice", (req,res)=>{
  console.log(req.params.id);
  Exercice.deleteOne({ id: req.params.id }, function(err,data) {
      if (!err) {
          console.log(data);

              console.log("Exercice successfully deleted")
      }
      else {
              console.log("error")
      }
  });
  res.redirect("/");
});

let ExamData ={
  universityName:"Institus superieur des arts de multimedias",
  logo:"https://i.ibb.co/PM1VfGb/logo.jpg",
  date:'A.U. 2021-2022.',
  departement:"Departement informatique"
}

app.get('/', (req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=invoice.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    
    () => stream.end()
  ,ExamData);
});

//executing server
app.listen(5000, () => console.log('Exame-maker is listening on port 5000.'));  