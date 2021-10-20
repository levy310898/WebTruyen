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
    },
    role:{
        type:String,
        enum:['USER','TRANSLATOR','ADMIN'],
        default:'USER',
    }
    // role:[user,vip,translator,admin]
})

module.exports = mongoose.model('users',UserSchema);