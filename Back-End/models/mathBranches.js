const mongoose = require('mongoose');

const mathBranchSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        lessons: {
            type:[],
            required:true
        }
    }
)
module.exports = MathBranch = mongoose.model('mathBranch',mathBranchSchema)