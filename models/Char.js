const mongoose = require('mongoose');

const charSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    char: {
        type: String,
        required: true,
        unique:true
    },
    isAlpha:{
        type:Number,
        require:true
    }
});

module.exports = new mongoose.model('char', charSchema);