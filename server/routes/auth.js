const argon2 = require('argon2');

const router = require('express').Router();
const { body, check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require("../models/User");

const tokenSecret = process.env.TOKEN_SECRET;
const expireTime = process.env.EXPIRE_TIME;


//@route POST /api/auth/register
//@desc register user
//@access : public

router.post('/register',
  body('email').isEmail(),
  body('fullName').not().isEmpty(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    // checking validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, message: errors.array() });
    }

    const {email,password,fullName } = req.body
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, message: 'email is exist!!' });
      }

      const hashPassword = await argon2.hash(password);

      const newUser = new User({ email, password:hashPassword, fullName });
      await newUser.save();//save data

      // create token
      const accessToken = jwt.sign(
        { user: { id: newUser._id, fullName } },
        tokenSecret,
        { expiresIn: expireTime },
        (err, accessToken) => {
          if (err) throw (err)
          else {
            return res.status(200).json({ success: true, message: 'register success', accessToken })
          }
        })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({min:8}),
  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, message: errors.array() });
    }

    const {email,password} = req.body;

    try {
      const user = await User.findOne({email});
      if(!user) return res.status(400).json({success:false,message:'email or password wrong!'})

      const passwordVerify = await argon2.verify(user.password,password);

      if(!passwordVerify) return res.status(400).json({success:false,message:'email or password wrong!'})

      jwt.sign(
        {user:{id:user._id,user:user.name}},
        tokenSecret,
        {expiresIn:expireTime},
        (err,accesToken)=>{
          if(err) throw(err);
          else{
            return res.status(200).json({success:true,message:"Login successfully !!!",token:accesToken})
          }
        }
      )
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
)

module.exports = router;

