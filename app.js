const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyparser =require('body-parser')
const method = require('method-override')
const session = require('express-session')
// Route
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin')
const layout = require('express-ejs-layouts')
const app = express();

// Db Setup
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:dzaka20@ds141815.mlab.com:41815/blogadmin',{
    useNewUrlParser:true
}).then(()=>{
  console.log('yes bisa')
}).catch(err=>{
  console.log(err)
})

app.use(bodyparser.urlencoded({extended:false}))

// view engine setup
app.use(layout)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(method('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  secret:"Dz20091996",
  key:"user_sid",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires:600000
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = app;
