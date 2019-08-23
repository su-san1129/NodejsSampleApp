var connection = require('./mysqlConnection');

module.exports = function(req, res, next){
  var userId = req.session.user_id;
  if (userId){
    // sessionにuser_idがセットされているかどうか確認
    var query = 'SELECT id,user_name FROM users WHERE id = ' + userId;
    connection.query(query, function(err, rows){
      if (!err) {
        // res.render('index,{ user: user}')の書き換え
        // ローカル変数の適用↑↑
        res.locals.user = rows.length? rows[0]: false;
      }
      //もし、sessionにユーザーIDがセットされていれば、次の処理に移る。
      next();
    });
  } else {
    if (req.originalUrl === "/"){
      res.redirect('top'); //もしルートパスへのアクセスならtopへと送る。
    } else {
    var redirect_url = req.originalUrl;
    req.session.originalUrl = redirect_url; //sessionにURLを保存。ログインの処理に足す。
    res.redirect('/login');
    console.log(req.session.originalUrl);
    }
  }
};