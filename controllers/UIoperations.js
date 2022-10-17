var fs = require('fs');



// addExercice
function addExercicePage (req, res, next) {

    var html = fs.readFileSync('./Front-End/addExercice.html', 'utf8')
    res.send(html)
  }
  
  // deleteExercice 
function deleteExercicePage (req, res, next) {
  
    var html = fs.readFileSync('./Front-End/deleteExercice.html', 'utf8')
    res.send(html)
  }
  
  // Login
function LoginPage (req, res, next) {
  
    var html = fs.readFileSync('./Front-End/login.html', 'utf8')
    res.send(html)
  }

function homePage (req, res, next) {
  
    var html = fs.readFileSync('./Front-End/home.html', 'utf8')
    res.send(html)
  }


  module.exports = { addExercicePage, deleteExercicePage, LoginPage ,homePage} 