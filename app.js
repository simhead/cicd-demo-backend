var createError = require('http-errors');
var express = require('express');
var apiKeyAuth = require('api-key-auth');
var cors = require('cors')
var db = require('./db')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(cors())
const userRouter = require('./routes/cicd-user-router')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// this is to log in consol terminal
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/cicd', userRouter);

// Create the collection of api keys
const apiKeys = new Map();
apiKeys.set('123456789', {
  id: 1,
  name: 'app1',
  secret: 'secret1'
});
apiKeys.set('987654321', {
  id: 2,
  name: 'app2',
  secret: 'secret2'
});

const userApikeyRouter = require('./routes/cicd-user-apikey-router');
//app.use(apiKeyAuth({ getSecret }));

// enable CORS for all routes and for specific API-Key header
app.use(function (req,
                  res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ' +
      'Content-Type, Accept, keyId')
  next()
})
// PROTECT ALL ROUTES THAT FOLLOW
app.use((req,
         res, next) => {
  const apiKey = req.get('keyId')
  //if (!apiKey || apiKey !== "123456789") {
  if (!apiKey) {
    res.status(400).json({error: 'bad request: missing apikey'})
  } else if (apiKeys.has(apiKey)) {
    next()
  } else {
    res.status(401).json({error: 'unauthorised'})
  }
})
app.use('/api/cicd/apikey', userApikeyRouter);

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
  res.render('error');
});

module.exports = app;

