require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// const passport = require('passport');
// const { jwtToken } = require('./passport.js');

// const login = require('./routes/login');
// const register = require('./routes/register');
// const books = require('./routes/books');
// const adminUsers = require('./routes/admin/users');
// const adminBooks = require('./routes/admin/books');
// const adminPayments = require('./routes/admin/payments');
// const buyBook = require('./routes/buyBook');

// const test = require('./routes/test');

const app = express();

// passport.use(jwtToken);
// app.use(passport.initialize());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + "/public"));

const db = require('./db/models');

// app.use('/login', login);
// app.use('/register', register);
// app.use('/books/', passport.authenticate('jwt', { session: false }), books);
// app.use('/admin/users', passport.authenticate('jwt', { session: false }), adminUsers);
// app.use('/admin/books', passport.authenticate('jwt', { session: false }), adminBooks);
// app.use('/admin/payments', passport.authenticate('jwt', { session: false }), adminPayments);
// app.use('/book/', passport.authenticate('jwt', { session: false }), buyBook);
// app.use('/test', test);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // // error handler
// app.use(function (err, req, res) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
