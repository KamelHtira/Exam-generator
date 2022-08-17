const mongoose = require('mongoose');

const exerciceSchema = mongoose.Schema(
    {
        path: {
            type:String,
            required:true
        },
        height: {
            type:Number,
            required:true
        },
        tags: {
            type:[],
            required:true
        },
        difficulty:{
            type:Number,
            required:true
        }
       
    }
)


Exercice = mongoose.model('exercice',exerciceSchema)

module.exports = Exercice
