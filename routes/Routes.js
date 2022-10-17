const express = require("express");
const { getAllExercices, addExercice, addNewUser, deleteExercice, getExercicesBytags  } = require("../controllers/CRUDexercices.js");
const  { getAllMathBranches, addMathBranche, deleteMathBranche, getLessonsByMathBranchesName }= require("../controllers/CRUDmathBranches");
const { addExercicePage, deleteExercicePage,homePage } = require("../controllers/UIoperations.js");
const { generateExam} = require("../controllers/examGenerator.js");
const router = express.Router()
const {middlewareYes  }=require('../middleware')

router.use(express.json())

// Exercices routes 

router.get('/Exercices', middlewareYes, getAllExercices);

router.get('/ExercicesByCategory', middlewareYes, getExercicesBytags);

router.post('/Exercice', middlewareYes, addExercice);

router.delete('/Exercice', middlewareYes, deleteExercice);

// UI routes 

router.get('/home', middlewareYes, homePage);

router.get('/addExerciceUI', middlewareYes, addExercicePage);

router.get('/deleteExerciceUI', middlewareYes, deleteExercicePage);

// services routes 

router.get('/generateExam/:id/:as', middlewareYes, generateExam);

// user routes 

router.post('/User',addNewUser);

// mathBranches routes 

router.get('/MathBranches', getAllMathBranches);

router.post('/MathBranches', addMathBranche);

router.delete('/MathBranches', deleteMathBranche)

router.post('/Lessons', getLessonsByMathBranchesName);

module.exports = router;