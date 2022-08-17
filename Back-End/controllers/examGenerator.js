const Exercice = require('../models/exercices');
const pdfService = require('../services/pdf-service');



// pdf service route
async function generateExam (req, res, next) {

    let testExercicesData  = await Exercice.find({});
    let ExamData ={
    universityName:"Institus superieur des arts de multimedias",
    logo:"https://i.ibb.co/PM1VfGb/logo.jpg",
    date:'A.U. 2021-2022.',
    departement:"Departement informatique",
    EXs:testExercicesData
  }
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline;filename=exam.pdf`,
    });

    console.log(req.params)
    pdfService.buildPDF(
      (chunk) => stream.write(chunk),
      
      () => stream.end()
    ,ExamData);
  }

  module.exports = { generateExam }