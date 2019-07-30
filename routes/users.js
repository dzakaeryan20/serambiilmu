const express = require('express');
const router = express.Router();
const SessionLogin = require('../middleware/index').SessionLogin
const userData = require('../models/user')
/* GET users listing. */
router.get('/',SessionLogin,function(req, res, next) {
 res.render('user')
  
});

router.get('/dashboard', async (req,res)=>{
    const datausers = await userData.find()
    res.send(datausers)
})

router.post('/login', (req,res)=>{
  userData.findOne({'username':req.body.username,'password':req.body.password}).then((data)=>{
    
    if(data){
      req.session.user = data
      res.redirect('/admin')
    }
    else{
      res.redirect('/users')
    }
    
  }).catch(err=>{
    res.redirect('/users')
  })
})
module.exports = router;
