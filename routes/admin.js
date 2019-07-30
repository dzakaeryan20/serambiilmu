var express = require('express');
var router = express.Router();
var BlogData= require('../models/blog')
const fs = require('fs')
const SessionCheck = require('../middleware/index').SessionCheck
const multer = require('multer')
const path = require('path')
const Storages=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/file')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

const upload =multer({
    storage:Storages
}).single('file');
/* GET home page. */
router.get('/',SessionCheck, (req, res) =>{
    BlogData.find().then((data)=>{
        res.render('admin/dashboard', { data:data });
        //res.send(list)
    }).catch(err=>{
        res.render(err)
    })
    
});
router.get('/create',(req,res)=>{
    res.render('admin/create')
})
router.get('/update/:id',(req,res)=>{
    BlogData.findById({_id:req.params.id}).then((data)=>{
        res.render('admin/update',{data:data})
    })
    
})
router.get('/delete/:id',async (req,res)=>{
    const list =await BlogData.findById({_id:req.params.id})
    let file =`./public/file/${list.file}`
    fs.unlink(file,err=>{
        if(err) throw err
    })
    BlogData.remove({_id:req.params.id}).then(()=>{
        res.redirect('/admin')
    }).catch((err)=>{
        res.send(err)
    })
})
router.get('/logout',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        res.clearCookie('user_sid')
        //req.session.destroy()
        res.redirect('/users')
    }
    
})

//download file
router.get('/download/:file',(req,res)=>{
    let file='./public/file/'+req.params.file
    res.download(file)
})

// Post
router.post('/save',(req,res)=>{

    upload(req,res,(err)=>{
            if(err){
                res.send(err)
            }
            else{
               const data ={
                   judul:req.body.judul,
                   file:req.file.filename,
                   artikel:req.body.artikel,
                   deskripsi:req.body.deskripsi,
                   date:Date.now()
               }
               const newProduct= new BlogData(data)
               newProduct.save().then(()=>{
                   res.redirect('/admin')
               }).catch(err=> console.error(err))
            
            }
        })
    //res.send(req.body)
})

router.put('/saveupdate',(req,res)=>{
    var d = new Date()
    d.toString().slice(0,15)
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }
        else{
        let lastfile='./public/file/'+req.body.filelast
            //const item = Date.now().toString().slice(0)
           const data ={
               judul:req.body.judul,
               file:req.file.filename,
               artikel:req.body.artikel,
               deskripsi:req.body.deskripsi,
               date:d
           }
           
           BlogData.update({_id:req.body.id},data).then(()=>{
           
            fs.unlink(lastfile)
            res.redirect('/admin')
           }).catch(err=> console.error(err))
        
        }
    })

})
module.exports = router;
