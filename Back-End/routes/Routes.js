const express = require("express");
const { getAllExercices, addExercice, addNewUser, deleteExercice, getExercicesByCategory  } = require("../controllers/CRUDoperations.js");
const { addExercicePage, deleteExercicePage } = require("../controllers/UIoperations.js");
const { generateExam} = require("../controllers/examGenerator.js");
const router = express.Router()
const {middlewareYes  }=require('../middleware')

router.use(express.json())

router.get('/Exercices', middlewareYes, getAllExercices);

router.get('/ExercicesByCategory', middlewareYes, getExercicesByCategory);

router.post('/Exercice', middlewareYes, addExercice);

router.get('/addExerciceUI', middlewareYes, addExercicePage);

router.delete('/Exercice', middlewareYes, deleteExercice);

router.get('/deleteExerciceUI', middlewareYes, deleteExercicePage);

router.get('/generateExam', middlewareYes, generateExam);

router.post('/User',addNewUser);

module.exports = router;