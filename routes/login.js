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
  var query = 'SELECT user_id,password FROM users WHERE email = "' + email + '" LIMIT 1';
  connection.query(query, function(err, rows){
    //一致しているユーザーをemailで探し、ハッシュ化した数値で照合
    if (bcrypt.compareSync(password, rows[0].password)) {
    //一致するデータがなければ、falseを返す
      var userId = rows.length? rows[0].user_id: false;
      if (userId) {
        req.session.user_id = userId;
        res.redirect('/');
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