# node-app
ログイン機能のついた掲示板アプリケーションです。

# 依存関係  
node.js v11.13.0  
npm v6.9.0  
express v4.16.1

# 課題
ある程度の機能を実装後に、sequelizeを入れたため、findAllなどのsequelizeらしい処理を記述できておりません。  
SQL文をベースとしたコードになっているため、書き換えていきたいと思います。

# 使用
```
$ npm install
$ sequelize db:migrate  
新規登録後、ログインページに遷移するので、ログインページで情報を入力いただくとログインできます。
```
# 参考サイト
url: https://github.com/osamu38/node-express-curriculum  
url: https://irisash.github.io/express/form_auth/  
url: https://qiita.com/y4u0t2a1r0/items/fb7a879cdd2a187bad29
