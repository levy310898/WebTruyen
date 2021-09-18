const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('users',UserSchema);