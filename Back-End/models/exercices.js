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
        category: {
            type:[],
            required:true
        }
    }
)
module.exports = Exercice = mongoose.model('exercice',exerciceSchema)