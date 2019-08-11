//利用するmoduleを定義
var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection')

router.get('/:board_id', function(req,res, next){
  var boardId = req.params.board_id;
  //データベースからboard_idを検索, boardIdと一致するか検索
  var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;
  var getMessagesQuery = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages WHERE board_id = ' + boardId;
  //非同期処理のためネストが深い
  connection.query(getBoardQuery, function(err, board){ //実行順序1
    connection.query(getMessagesQuery, function(err, messages){ //実行順序2
      res.render('board',{ //実行順序3
        title: board[0].title,
        board: board[0],
        messageList: messages
      });
    });
  });
});

router.post('/:board_id', function(req, res, next) {
  var message = req.body.message;
  var boardId = req.params.board_id;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  //投稿データをdatabaseに登録
  var query = 'INSERT INTO messages (message, board_id, created_at) VALUES ("' + message + '", ' + '"' + boardId + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows) {
    //詳細ページにリダイレクトする。
    res.redirect('/boards/' + boardId);
  });
});


module.exports = router;