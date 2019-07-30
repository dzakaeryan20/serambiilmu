
const SessionLogin = (req,res,next)=>{
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/admin')
    }
    else{
        next()
    }
}
const SessionCheck =(req,res,next)=>{
    if(!req.session.user && !req.cookies.user_sid){
        res.redirect('/users')
    }
    else{
        next()
    }    
}

module.exports ={
    SessionLogin,
    SessionCheck
} 