const express = require("express");
const { verifyLogin } = require("../controllers/authOperations.js");
const {LoginPage } = require("../controllers/UIoperations.js");
const router = express.Router()
const {middlewareNo }=require('../middleware')

router.use(express.json())

router.get('/login',middlewareNo,LoginPage);

router.post('/api/login',verifyLogin);

module.exports = router;