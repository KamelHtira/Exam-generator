const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios').default;

const   ran=(max,min)=>{
  return Math.floor(Math.random() * (max - min ) + min)
}


const  buildPDF=async (dataCallback, endCallback,ExamData)=> {
  

  console.log(ExamData.EXs)
  let T = ExamData.EXs
  const Exam = new PDFDocument({ bufferPages: true, font: 'Courier' });
  Exam.fontSize(12).font('Helvetica').fillColor('#282828')
  Exam.text(ExamData.universityName,50,50,{align:"center"})

  const response = await axios.get(ExamData.logo,  { responseType: 'arraybuffer' })
  const logo = Buffer.from(response.data, "utf-8")

  Exam.image(logo,30,10,{align:"left",width:"80"})
  Exam.fontSize(8)
  Exam.text(' '.repeat(200),{align:"center",underline: true})
  Exam.fontSize(9)
  Exam.text(ExamData.date+'\n'+ExamData.departement ,460,45,{align:"right",width:"120"})



  let Exs=[]
  var pageH=200
  let pN=1
  
  Exam.fontSize(12)
  for( i=0;i<ran(5,3);i++){
    console.log("I am i : "+i)
    if(i==3*pN){
      Exam.addPage()
      pN++
      pageH=150
    }
    do {
      Ex=ran(5,1)
  
    }
    while (Exs.includes(Ex)==true && i!=0)
    Exs[i]=Ex
  
    console.log("the exercice : "+Exs[i])

    const response = await axios.get(`${T[Exs[i]].path}`,  { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, "utf-8")
    Exam.image(buffer, 10, pageH,{width:550})
     .text('Exercire '+(i+1),60, pageH-30);
  
     pageH=pageH+T[Exs[i]].height+50
  }
  
  Exam.pipe(fs.createWriteStream('Exam.pdf'));
  Exam.on('data', dataCallback);
  Exam.on('end', endCallback);
  Exam.end()
}

module.exports = { buildPDF };
