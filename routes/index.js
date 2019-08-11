var express = require('express');
var router = express.Router();
var moment = require('moment'); // 追加
var connection = require('../mysqlConnection'); // 追加

/* GET home page. */
router.get('/', function(req, res, next) {
   if (req.session.user_id) {
    var query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards';
      connection.query(query, function(err, rows) {
      console.log(rows);
      res.render('index', { 
       title: 'Express',
       //データベースを取得
       boardList: rows
     });
    });
  } else {
    //セッションIDがなければ、topページに飛ばす。
    res.render('top', {
      title: 'サンプル掲示板'
    });
  }
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO boards (title, created_at) VALUES ("' + title + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

module.exports = router;