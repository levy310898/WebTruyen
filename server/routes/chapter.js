const router = require('express').Router();
const { body, validationResult } = require('express-validator');

require('dotenv').config();

const Manga = require("../models/Manga.js");

const Chapter = require("../models/Chapter.js");

//@route POST /api/manga
//@desc add manga
//@access : only translator, but we will get to that later

router.post('/',
    // will have middleware test TranslatorId
    //  TranslatorId and can update this manga
  body('name').notEmpty(),
  body('mangaId').notEmpty(),
  async (req, res) => {
    // checking validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { name,content='',mangaId = '' } = req.body;
    try {
        const manga = await Manga.findByIdAndUpdate(
          {// condition to find
            _id:mangaId,
          },
          {// data to update
              updateChapterAt:Date.now(),
          },
          {// option
            new:true
          }
        )
        if(!manga) return res.status(401).json({success:false,message:'create chapter fail!!'});
        
        const newChapter = new Chapter({
        name,
        content,
        mangaId
        });
        await newChapter.save();//save data

        return res.status(200).json({ success: true, message: 'create chapter successfully!!!' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
  }
)

//@api  GET /chapter/latest
//@desc get 10 manga that created lately
//@access public

router.get('/latest', async(req, res) => {
    try {
    const chapters = await Chapter.find().sort({createdAt:-1}).limit(10);
    console.log('chapter = ',chapters);
    return res.status(200).json({ success: true, message: 'Get chapters successfully!!!',data:chapters })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, message: error.message });
    }
  })
module.exports = router;

