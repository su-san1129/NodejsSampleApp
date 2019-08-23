var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var bcrypt = require('bcrypt')

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン'
    });
  }
});

router.post('/', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  // 一致しているemail,passwordのユーザーを一件返すsql文
  var query = 'SELECT id,password FROM users WHERE email = "' + email + '" LIMIT 1';
  connection.query(query, function(err, rows){
    //ハッシュ化したパスワードがあるか確認。なければ、false
    var hashpass = rows.length? rows[0].password: false;
    //↓あった場合
    if (hashpass){
      //フォームへの入力値と、DBのPWが一致するか確認
      if (bcrypt.compareSync(password, hashpass)) {
      //一致するデータがなければ、falseを返す
        var userId = rows.length? rows[0].id: false;
        //passwordが一致し、userIdがあった場合
        if (userId) {
          // 現在のuserIdをセッションに保存
          req.session.user_id = userId;
          //セッションのurlを定義
          var sessionUrl = req.session.originalUrl;
          //セッションのurlがあった場合
          if (sessionUrl){
            //セッションのurlに飛ばす
            res.redirect(sessionUrl)
          } else {
            //セッションのurlがなかった場合
            res.redirect('/');
          }
        } else {
          res.render('login', {
            title: 'ログイン',
            noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
          });
        }
      } else {
        res.render('login', {
          title: 'ログイン',
          noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
        });
      }
    } else {
      res.render('login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});

module.exports = router;