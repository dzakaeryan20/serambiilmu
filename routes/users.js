const express = require('express');
const router = express.Router();

const userData = require('../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('user')
  
});

router.get('/dashboard', async (req,res)=>{
    const datausers = await userData.find()
    res.send(datausers)
})

router.post('/login', (req,res)=>{
  userData.findOne({'username':req.body.username,'password':req.body.password}).then(()=>{
    res.redirect('/admin')
  }).catch(err=>{
    res.send(err)
  })
})
module.exports = router;
