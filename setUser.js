var connection = require('./mysqlConnection');

module.exports = function(req, res, next){
  var userId = req.session.user_id;
  if (userId){
    // sessionにuser_idがセットされているかどうか確認
    var query = 'SELECT user_id, user_name FROM users WHERE user_id = ' + userId;
    connection.query(query, function(err, rows){
      if (!err) {
        // res.render('index,{ user: user}')の書き換え？
        res.locals.user = rows.length? rows[0]: false;
      }
    });
  }
  next();
};