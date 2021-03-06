const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    description :{
        type: String,
        required : true
    },
    progress :{
        type: Number,
        required : true,
        default: 0
    },
    likes: [{
        type: String
    }],
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'register'
    }
}, {timestamps: true})

const project = mongoose.model('Project',projectSchema)

module.exports = project