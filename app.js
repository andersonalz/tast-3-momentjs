const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const indexRouter = require('./routes/uploud_router');
const usersRouter = require('./routes/users');
mongoose.connect('mongodb://localhost:27017/file_upload_momentJs', {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/u', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
