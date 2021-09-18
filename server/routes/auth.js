const argon2 = require('argon2');

const router = require('express').Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();


router.get('/',(req,res)=>res.send({success:true,message:'test auth api done'}))

module.exports = router;

