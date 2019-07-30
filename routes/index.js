const express = require('express');
const router = express.Router();
const Blogdata = require('../models/blog')
/* GET home page. */
router.get('/', async(req, res, next)=> {
  const data = await Blogdata.find()
  //res.send(data)
  res.render('index', { title: 'Express', data:data});
});

router.get('/artikel/download/:file',(req,res)=>{
  let file='./public/file/'+req.params.file
  res.download(file)
})

router.get('/artikel/:id',async(req,res,next)=>{
  const data = await Blogdata.findById({_id:req.params.id})
  res.render('artikel/artikel',{data:data})
})

module.exports = router;
