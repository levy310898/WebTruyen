const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MangaSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:['ON GOING','FINISHED','DROP'],
        default:'ON GOING'
    },
    translatorId:{
        type:String,
    },
    category:{
        type:[String],
        enum:['ADVENTURE','ACTION','ROMANCE','SHONEN','SHOUJO','TRAGEDY','COMEDY','PSYCHOLOGICAL']
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    like:{
        type:Number,
        default:0
    },
    imageURL:{
        type:String,
    },
    updateChapterAt:{
        type:Date,
    }
})

module.exports = mongoose.model('mangas',MangaSchema);