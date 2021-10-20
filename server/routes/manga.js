const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Chapter = require('../models/Chapter.js');

require('dotenv').config();

const Manga = require("../models/Manga.js");

//@route POST /api/manga
//@desc add manga
//@access : only translator,but we will get to that later

router.post('/',
    // will have middleware test for translator role
  body('name').notEmpty(),
  async (req, res) => {
    // checking validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { name,category = [] } = req.body;
    // translator id will get by the middleware
    try {
      const newManga = new Manga({
        name,
        category
      });
      await newManga.save();//save data

      return res.status(200).json({ success: true, message: 'create manga successfully!!!' })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
)

//@api  GET /project
//@desc get all project you have
//@access public

router.get('/', async(req, res) => {
    // try {
    //   const projects = await Project.find().limit(10);
    //   return res.status(200).json({ success: true, message: 'Get project successfully!!!',data:projects })
    // } catch (error) {
    //   console.log(error.message)
    //   return res.status(500).json({ success: false, message: error.message });
    // }
  })

//@api  GET /manga/hot
//@desc get 10 hot manga that status is OnGoing and have the most like
//@access public

router.get('/hot', async(req, res) => {
  try {
  const mangas = await Manga.find({status:'ON GOING'},{name:1,like:1,imageURL:1}).sort({like:-1}).limit(10);
  let result = [...mangas];
  const addChapters = async (index,done)=>{
    if(index>=result.length){
      done && done();
    } 
    else{
      const {_id,name,like,imageURL} = result[index];
      const lastChapters = await Chapter.find({mangaId:_id},{name:1,createdAt:1}).sort({createdAt:-1}).limit(3);
      result[index] = {_id,name,like,imageURL,lastChapters};
      addChapters(index+1,done);
    }
  }

  addChapters(0,()=>{
    return res.status(200).json({ success: true, message: 'Get chapters successfully!!!',data:result })
  });
  
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message });
  }
})
module.exports = router;

