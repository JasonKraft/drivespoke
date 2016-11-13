var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var http = require('http');
var twilio = require('twilio');
mongoose.Promise = global.Promise;
var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Users = require('./models/users');
var Requests = require('./models/requests');

passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
//var logout = require('./routes/login');
var register = require('./routes/register');
var requests = require('./routes/requests');
var confirmation = require('./routes/confirmation');

var expressHbs = require('express-handlebars');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('join', function(data) {
        socket.join(data);
    });
    socket.on('get-requests', function(data, callback) {
        //io.sockets.in(data).emit('hello');
        requests.getAllRequestsInWaitQueue(function(r) {
            //console.log(r);
            callback(r);
        });

    });

    socket.on('get-my-requests', function(data, callback) {
        requests.getAllMyRequests(data, function(r) {
            callback(r);
        });
    });

    socket.on('accept-ride', function(data, callback) {
        requests.markRideAsAccepted(data.rid, data.uid, function(err) {
            callback();
        });
    });

    socket.on('ride-arrived', function(data, callback) {
        requests.notifyPassengerCarHasArrived(data.rid, data.uid, function(err) {
            callback();
        });
    });

    socket.on('ride-picked', function(data, callback) {
        requests.markRideAsPickedUp(data.rid, data.uid, function(err) {
            callback();
        });
    });

    socket.on('ride-dropped', function(data, callback) {
        requests.markRideAsDroppedOff(data.rid, data.uid, function(err) {
            callback();
        });
    });
});

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/confirmation', confirmation);
app.use('/users', users);
app.use('/login', login);
//app.use('/logout', logout);
app.use('/register', register);
app.use('/request', requests);

app.use(function(req, res, next) {
    res.io = io;
    next();
});

app.post('/sms', function(req, res) {
  console.log(req.body.Body);
  // console.log(res);
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = {app: app, server: server};;
