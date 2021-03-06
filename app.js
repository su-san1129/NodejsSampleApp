var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//expressでセッションを使うためのモジュール。IDだけをサーバーに保存。
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var top = require('./routes/top');
//boardsのルーティング設定
var boards = require('./routes/boards');
var register = require('./routes/register'); //registerのルーティング
var login = require('./routes/login');
var logout = require('./routes/logout');
//ログインしているかどうかを確認する
var setUser = require('./setUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//viewのテンプレートエンジンを指定。
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessionを利用する際の詳細
app.use(session({
  //sessionIDの署名
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/login', login);
app.use('/logout',logout);
app.use('/top', top);
app.use('/register', register); //urlのregisterが使えるようになる。
app.use('/users', usersRouter);
//プログラムが読まれる順番を考慮し、app.useにsetUserに適用。
app.use(setUser)
app.use('/', indexRouter);
//ミドルウェアの呼び出しを行っている。
app.use('/boards', boards); //boardsはrequire('./routes/boards')のこと



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
