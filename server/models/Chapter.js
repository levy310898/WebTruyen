const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MangaSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String
    },
    mangaId:{
        type:String,
    }
})

module.exports = mongoose.model('chapters',MangaSchema);