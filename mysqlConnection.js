var mysql = require('mysql');

var dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bulletin_board'
};
//createConnectionにデータベースに必要な情報を記載
var connection = mysql.createConnection(dbConfig); //引数にdbConfigを指定

module.exports = connection;